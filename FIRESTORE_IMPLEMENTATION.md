# ByteBite Firebase Firestore Implementation Guide

## Overview

This document outlines the Firebase Firestore implementation for ByteBite, which provides persistent data storage for user-specific calorie entries and meal plans, grouped by user.

## Architecture

### Data Structure

All user data is organized in a hierarchical subcollection structure:

```
firestore/
├── users/ (collection)
│   └── {userId}/ (user document)
│       ├── calorieEntries/ (subcollection)
│       │   ├── {entryId}: { food, calories, mealType, timestamp, createdAt }
│       │   ├── {entryId}: { ... }
│       │   └── {entryId}: { ... }
│       │
│       └── mealPlans/ (subcollection)
│           ├── {mealId}: { date, type, name, calories, time, createdAt, updatedAt }
│           ├── {mealId}: { ... }
│           └── {mealId}: { ... }
```

### Key Benefits

1. **User-Specific Data**: Each user's data is isolated under their unique Firebase UID
2. **Organized by Type**: Data is grouped into separate subcollections (calorieEntries, mealPlans)
3. **Security**: Firestore security rules ensure users can only access their own data
4. **Scalability**: Subcollection structure scales well with growing data

---

## Implementation Details

### 1. Firestore Utilities (`src/utils/firestoreUtils.js`)

Central utility file with all Firestore operations. Provides clean, abstracted functions for data operations.

#### Calorie Entry Functions

```javascript
// Load today's calorie entries
await loadTodaysCalorieEntries(userId)

// Add a new calorie entry
await addCalorieEntry(userId, {
  food: string,
  calories: number,
  mealType: string // "Breakfast" | "Lunch" | "Dinner" | "Snack"
})

// Update a calorie entry
await updateCalorieEntry(userId, entryId, updateData)

// Delete a calorie entry
await deleteCalorieEntry(userId, entryId)

// Get entries for a date range
await getCalorieEntriesForDateRange(userId, startDate, endDate)
```

#### Meal Plan Functions

```javascript
// Load all meal plans for a user
await loadUserMealPlans(userId)

// Get meals for a specific date
await getMealsForDate(userId, dateString) // "YYYY-MM-DD"

// Add a new meal plan
await addMealPlan(userId, {
  date: string,        // "YYYY-MM-DD"
  type: string,        // "Breakfast" | "Lunch" | "Dinner" | "Snack"
  name: string,
  calories?: number,
  time?: string        // "HH:MM" format
})

// Update a meal plan
await updateMealPlan(userId, mealId, updateData)

// Delete a meal plan
await deleteMealPlan(userId, mealId)
```

### 2. CalorieTracker Component (`src/views/CalorieTracker.vue`)

**Status**: ✅ Updated to use new Firestore utilities

**Changes Made**:
- Replaced direct Firestore queries with utility functions
- Simplified imports (removed `collection`, `addDoc`, `updateDoc`, `deleteDoc`, etc.)
- Uses `loadTodaysCalorieEntries()` for loading
- Uses `addCalorieEntry()` for new entries
- Uses `updateCalorieEntry()` for edits
- Uses `deleteCalorieEntry()` for deletions

**Firestore Path**: `users/{userId}/calorieEntries/{entryId}`

**Entry Structure**:
```javascript
{
  food: string,
  calories: number,
  mealType: string,
  timestamp: Timestamp,
  createdAt: Timestamp
}
```

### 3. PlanMeal Component (`src/views/PlanMeal.vue`)

**Status**: ✅ Migrated from localStorage to Firebase

**Major Changes**:
- Removed localStorage dependency
- Integrated `loadUserMealPlans()` on component mount
- Uses Firebase for all meal CRUD operations
- Added error handling and loading states
- Added error message display in template
- Async meal operations with proper user authentication checks

**Firestore Path**: `users/{userId}/mealPlans/{mealId}`

**Meal Structure**:
```javascript
{
  date: string,              // "YYYY-MM-DD"
  type: string,              // "Breakfast" | "Lunch" | "Dinner" | "Snack"
  name: string,
  calories: number | null,
  time: string | null,       // "HH:MM"
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## Firestore Security Rules (`firestore.rules`)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // User profiles - user can manage their own
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow update, delete: if request.auth.uid == userId;
    }

    // Calorie entries - user can manage their own
    match /users/{userId}/calorieEntries/{entryId} {
      allow read, create, update, delete: if request.auth.uid == userId;
    }

    // Meal plans - user can manage their own
    match /users/{userId}/mealPlans/{mealId} {
      allow read, create, update, delete: if request.auth.uid == userId;
    }

    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**To Deploy**:
1. Go to Firebase Console → Firestore Database → Rules
2. Copy the contents of `firestore.rules`
3. Replace the existing rules
4. Click "Publish"

---

## Error Handling

All operations include comprehensive error handling:

```javascript
try {
  await addMealPlan(userId, mealData)
  // Success handling
} catch (error) {
  console.error('Error:', error.message)
  // Display user-friendly error message
}
```

**Common Errors**:
- "User ID is required" - User not authenticated
- "Missing required fields" - Incomplete form data
- "Failed to add..." - Firebase permission or connection issue

---

## Data Persistence & Sync

### Real-Time Sync
The implementation uses standard Firebase queries which provide real-time updates when rules are configured for `listen()` operations. Currently using `getDocs()` for one-time reads.

### To Enable Real-Time Sync (Optional)
Replace `getDocs()` with `onSnapshot()` in utility functions for live updates:

```javascript
import { onSnapshot } from 'firebase/firestore'

// Real-time listener
const unsubscribe = onSnapshot(
  query(collection(db, `users/${userId}/mealPlans`)),
  (snapshot) => {
    const meals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }
)
```

---

## Migration Notes

### From LocalStorage to Firestore
The PlanMeal component was previously using `localStorage`. The migration process:

1. ✅ Created centralized utility functions
2. ✅ Updated CalorieTracker to use utilities (was already using Firestore at root level)
3. ✅ Migrated PlanMeal from localStorage to Firestore subcollections
4. ✅ Added proper error handling and loading states
5. ✅ Created and published Firestore security rules

### Data Migration (If Needed)
If you have existing meal plans in localStorage:

```javascript
// Temporary migration script
const oldMeals = JSON.parse(localStorage.getItem('mealPlans')) || []

// Migrate each meal to Firestore
for (const meal of oldMeals) {
  await addMealPlan(currentUserId, {
    date: meal.date,
    type: meal.type,
    name: meal.name,
    calories: meal.calories,
    time: meal.time
  })
}

// Clear old localStorage
localStorage.removeItem('mealPlans')
```

---

## Usage Examples

### Add a Calorie Entry
```javascript
import { addCalorieEntry } from '@/utils/firestoreUtils'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

try {
  const entryId = await addCalorieEntry(authStore.user.uid, {
    food: 'Grilled Chicken Breast',
    calories: 450,
    mealType: 'Lunch'
  })
  console.log('Entry added:', entryId)
} catch (error) {
  console.error('Failed to add entry:', error.message)
}
```

### Add a Meal Plan
```javascript
import { addMealPlan } from '@/utils/firestoreUtils'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

try {
  const mealId = await addMealPlan(authStore.user.uid, {
    date: '2025-10-26',
    type: 'Breakfast',
    name: 'Oatmeal with Berries',
    calories: 350,
    time: '08:00'
  })
  console.log('Meal plan added:', mealId)
} catch (error) {
  console.error('Failed to add meal:', error.message)
}
```

### Load User's Meal Plans
```javascript
import { loadUserMealPlans } from '@/utils/firestoreUtils'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

try {
  const meals = await loadUserMealPlans(authStore.user.uid)
  console.log('Loaded meals:', meals)
} catch (error) {
  console.error('Failed to load meals:', error.message)
}
```

---

## Testing the Implementation

### Manual Testing Checklist

#### Calorie Tracker
- [ ] Add a calorie entry
- [ ] Verify it appears in the list
- [ ] Edit an entry and confirm changes save
- [ ] Delete an entry and confirm removal
- [ ] Refresh page and verify data persists
- [ ] Log out and log back in, verify entries still there

#### Meal Planner
- [ ] Add a meal to a day
- [ ] Verify it appears on the calendar
- [ ] Click day to see meal details
- [ ] Delete a meal and confirm removal
- [ ] Navigate to different months
- [ ] Refresh page and verify meals persist
- [ ] Log out and log back in, verify meals still there

#### Security
- [ ] Try accessing another user's meals (should fail in rules)
- [ ] Verify unauthenticated users cannot add data

---

## Troubleshooting

### Meals Not Loading
1. Check browser console for error messages
2. Verify user is authenticated (`authStore.user` exists)
3. Check Firestore security rules in Firebase Console
4. Verify data exists in Firestore Console under `users/{userId}/mealPlans`

### Meals Not Saving
1. Check console for error messages
2. Verify Firebase write permissions in security rules
3. Check network tab for failed requests
4. Verify Firestore has write capacity (not in read-only mode)

### Performance Issues
1. Use Firestore indexes for complex queries (auto-created by Firebase)
2. Implement pagination for large datasets
3. Consider using real-time listeners instead of repeated queries

---

## Future Enhancements

1. **Real-Time Sync**: Convert to `onSnapshot()` for live updates
2. **Offline Support**: Enable Firestore offline persistence
3. **Batch Operations**: Optimize multiple adds/updates with batch writes
4. **Data Backup**: Implement automated backups via Firebase Admin SDK
5. **Analytics**: Track user behavior with Firestore analytics
6. **Cloud Functions**: Add server-side logic (email notifications, data aggregation)

---

## File Changes Summary

| File | Status | Changes |
|------|--------|---------|
| `src/utils/firestoreUtils.js` | ✅ Created | New centralized utility file with all Firestore operations |
| `src/views/CalorieTracker.vue` | ✅ Updated | Simplified to use utility functions |
| `src/views/PlanMeal.vue` | ✅ Updated | Migrated from localStorage to Firebase Firestore |
| `firestore.rules` | ✅ Created | Security rules for user data isolation |

---

## Support & Documentation

- Firebase Firestore Docs: https://firebase.google.com/docs/firestore
- Firebase Security Rules: https://firebase.google.com/docs/firestore/security/start
- Firebase Console: https://console.firebase.google.com/

