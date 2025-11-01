/**
 * Firestore Data Migration Script
 * Migrates user data from UID-based paths to email-based paths
 *
 * Usage: node scripts/migrateToEmailPaths.js
 */

import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========== CONFIGURATION ==========
const CONFIG = {
  serviceAccountPath: path.join(__dirname, '../serviceAccountKey.json'),
  dryRun: true, // Set to false to actually perform migrations
  batchSize: 10, // Process users in batches
  subcollections: ['mealPlans', 'calorieEntries'], // Collections to migrate
};

// ========== HELPER FUNCTIONS ==========
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warn: (msg) => console.log(`⚠️  ${msg}`),
  error: (msg) => console.log(`❌ ${msg}`),
  divider: () => console.log('\n' + '─'.repeat(80) + '\n'),
};

const prompt = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// ========== MIGRATION FUNCTIONS ==========

/**
 * Initialize Firebase Admin SDK
 */
async function initializeFirebase() {
  try {
    if (!fs.existsSync(CONFIG.serviceAccountPath)) {
      throw new Error(
        `Service account key not found at ${CONFIG.serviceAccountPath}\n` +
        `Please download it from Firebase Console > Project Settings > Service Accounts`
      );
    }

    const serviceAccount = JSON.parse(
      fs.readFileSync(CONFIG.serviceAccountPath, 'utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    log.success('Firebase Admin SDK initialized');
    return admin.firestore();
  } catch (error) {
    log.error(`Failed to initialize Firebase: ${error.message}`);
    throw error;
  }
}

/**
 * Get all user documents from UID-based paths
 */
async function getUsersWithUIDPaths(db) {
  try {
    log.info('Scanning for users with UID-based paths...');

    const snapshot = await db.collection('users').get();
    const usersWithUIDPaths = [];

    snapshot.forEach((doc) => {
      const docId = doc.id;
      // Check if the document ID looks like a UID (random string of ~28 chars)
      // UIDs typically match this pattern
      if (docId.length === 28 && docId.match(/^[a-zA-Z0-9]{28}$/)) {
        const userData = doc.data();
        if (userData.email) {
          usersWithUIDPaths.push({
            uid: docId,
            email: userData.email,
            data: userData,
          });
        }
      }
    });

    return usersWithUIDPaths;
  } catch (error) {
    log.error(`Failed to fetch users: ${error.message}`);
    throw error;
  }
}

/**
 * Migrate a single user's data from UID path to email path
 */
async function migrateUser(db, user) {
  const { uid, email, data } = user;

  try {
    log.info(`Migrating user: ${email}`);

    // 1. Check if email-based document already exists
    const emailDocRef = db.collection('users').doc(email);
    const emailDocSnapshot = await emailDocRef.get();

    if (emailDocSnapshot.exists()) {
      log.warn(`  Email-based document already exists for ${email}, skipping...`);
      return { status: 'skipped', reason: 'Email path already exists' };
    }

    if (CONFIG.dryRun) {
      log.info(`  [DRY RUN] Would create document at: users/${email}`);
      return { status: 'dry_run' };
    }

    // 2. Create user document at email path
    await emailDocRef.set(data);
    log.success(`  ✓ Created user document at: users/${email}`);

    // 3. Migrate subcollections
    for (const subcollection of CONFIG.subcollections) {
      await migrateSubcollection(db, uid, email, subcollection);
    }

    return { status: 'success' };
  } catch (error) {
    log.error(`  Failed to migrate ${email}: ${error.message}`);
    return { status: 'error', error: error.message };
  }
}

/**
 * Migrate a subcollection from UID path to email path
 */
async function migrateSubcollection(db, uid, email, subcollectionName) {
  try {
    const oldSubcollectionRef = db
      .collection('users')
      .doc(uid)
      .collection(subcollectionName);

    const snapshot = await oldSubcollectionRef.get();

    if (snapshot.empty) {
      log.info(`  ✓ ${subcollectionName}: No documents to migrate`);
      return;
    }

    const newSubcollectionRef = db
      .collection('users')
      .doc(email)
      .collection(subcollectionName);

    let migratedCount = 0;

    for (const doc of snapshot.docs) {
      if (CONFIG.dryRun) {
        log.info(`    [DRY RUN] Would copy ${subcollectionName} doc: ${doc.id}`);
        migratedCount++;
      } else {
        await newSubcollectionRef.doc(doc.id).set(doc.data());
        migratedCount++;
      }
    }

    log.info(
      `  ✓ ${subcollectionName}: Migrated ${migratedCount} document(s)`
    );
  } catch (error) {
    log.error(
      `  Failed to migrate ${subcollectionName}: ${error.message}`
    );
  }
}

/**
 * Delete old UID-based documents
 */
async function deleteOldUIDData(db, uids) {
  if (CONFIG.dryRun) {
    log.info('[DRY RUN] Would delete the following UID documents:');
    uids.forEach((uid) => log.info(`  - users/${uid}`));
    return;
  }

  try {
    for (const uid of uids) {
      log.info(`Deleting old data for UID: ${uid}`);

      // Delete subcollections first
      for (const subcollection of CONFIG.subcollections) {
        const snapshot = await db
          .collection('users')
          .doc(uid)
          .collection(subcollection)
          .get();

        for (const doc of snapshot.docs) {
          await doc.ref.delete();
        }
      }

      // Then delete the user document
      await db.collection('users').doc(uid).delete();
      log.success(`  Deleted: users/${uid}`);
    }
  } catch (error) {
    log.error(`Failed to delete old data: ${error.message}`);
  }
}

// ========== MAIN MIGRATION FLOW ==========

async function runMigration() {
  log.divider();
  log.info('🚀 Firestore Email-Based Path Migration Tool');
  log.divider();

  try {
    // Step 1: Initialize Firebase
    log.info('Step 1: Initializing Firebase Admin SDK...');
    const db = await initializeFirebase();
    log.divider();

    // Step 2: Check for users with UID paths
    log.info('Step 2: Scanning for users with UID-based paths...');
    const usersWithUIDPaths = await getUsersWithUIDPaths(db);

    if (usersWithUIDPaths.length === 0) {
      log.success('No users with UID-based paths found. Your data is already migrated!');
      process.exit(0);
    }

    log.success(`Found ${usersWithUIDPaths.length} user(s) with UID-based paths:`);
    usersWithUIDPaths.forEach((user) => {
      log.info(`  - ${user.email} (UID: ${user.uid})`);
    });
    log.divider();

    // Step 3: Show configuration
    log.info('Step 3: Migration Configuration:');
    log.info(`  Mode: ${CONFIG.dryRun ? 'DRY RUN (no changes)' : 'LIVE (data will be modified)'}`);
    log.info(`  Users to migrate: ${usersWithUIDPaths.length}`);
    log.info(`  Subcollections: ${CONFIG.subcollections.join(', ')}`);
    log.divider();

    // Step 4: Ask for confirmation
    if (!CONFIG.dryRun) {
      log.warn('⚠️  WARNING: This will modify your Firestore database!');
      const confirmation = await prompt(
        'Type "MIGRATE" to proceed with migration: '
      );

      if (confirmation !== 'MIGRATE') {
        log.info('Migration cancelled.');
        process.exit(0);
      }
    }

    log.divider();
    log.info('Step 4: Starting migration...');
    log.divider();

    // Step 5: Migrate each user
    const results = {
      success: 0,
      skipped: 0,
      error: 0,
      dryRun: 0,
    };

    for (const user of usersWithUIDPaths) {
      const result = await migrateUser(db, user);
      results[result.status]++;
    }

    log.divider();
    log.info('Step 5: Migration Summary:');
    log.info(`  ✅ Successful: ${results.success}`);
    log.info(`  ⏭️  Skipped: ${results.skipped}`);
    log.info(`  ❌ Errors: ${results.error}`);
    if (results.dryRun > 0) {
      log.info(`  🔄 Dry Run: ${results.dryRun}`);
    }

    // Step 6: Ask about deleting old data
    if (!CONFIG.dryRun && results.success > 0) {
      log.divider();
      const uidsToDelete = usersWithUIDPaths.map((u) => u.uid);
      const shouldDelete = await prompt(
        'Delete old UID-based documents? (type "yes" to confirm): '
      );

      if (shouldDelete === 'yes') {
        log.info('Deleting old UID-based data...');
        await deleteOldUIDData(db, uidsToDelete);
        log.success('Old data deleted successfully!');
      } else {
        log.warn(
          'Old UID-based documents were NOT deleted. You can delete them manually later.'
        );
      }
    }

    log.divider();
    log.success('✨ Migration completed!');
    log.info('Your Firestore data is now organized by email addresses.');
    log.divider();

    process.exit(0);
  } catch (error) {
    log.error(`Migration failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// ========== RUN MIGRATION ==========
runMigration();
