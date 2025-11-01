# Firebase Firestore Setup Instructions

## Quick Start

Your ByteBite application is now configured to store calorie entries and meal plans in Firebase Firestore, organized by user.

## What Was Done

### 1. ✅ Created Firestore Utilities (`src/utils/firestoreUtils.js`)
   - Centralized file with all Firestore operations
   - Functions for managing calorie entries and meal plans
   - Built-in error handling and logging
   - Clean, reusable API

### 2. ✅ Updated CalorieTracker Component
   - Now uses the new utility functions
   - Cleaner code with better separation of concerns
   - Saves calorie entries to: `users/{userId}/calorieEntries/`

### 3. ✅ Migrated PlanMeal Component from localStorage to Firebase
   - Removed localStorage dependency
   - All meal plans now saved to: `users/{userId}/mealPlans/`
   - Added loading states and error handling
   - User-specific meal data with real-time persistence

### 4. ✅ Created Firestore Security Rules (`firestore.rules`)
   - User data isolation (can only access own data)
   - Proper read/write permissions
   - Denies all unauthorized access

## Data Organization

All user data is organized by user ID and then by data type:

```
users/
├── {userId}/
│   ├── calorieEntries/
│   │   └── Individual daily calorie logs
│   └── mealPlans/
│       └── Meal planning data
```

## Next Steps

### Step 1: Deploy Security Rules to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your ByteBite project
3. Go to **Firestore Database** → **Rules** tab
4. Replace the existing rules with the contents of `firestore.rules`
5. Click **Publish**

**Important**: Without these rules, anyone can access your users' data!

### Step 2: Test the Implementation

#### Test Calorie Tracker:
1. Login to your app
2. Navigate to "Calorie Tracker"
3. Add a calorie entry (e.g., "Chicken Breast, 450 kcal, Lunch")
4. Refresh the page - entry should still be there ✓
5. Edit the entry and verify changes save ✓
6. Delete the entry and verify removal ✓

#### Test Meal Planner:
1. Navigate to "Plan Meal"
2. Click on a day to add a meal
3. Add a meal (e.g., "Grilled Chicken Salad, Breakfast")
4. Refresh the page - meal should still be there ✓
5. Delete the meal and verify removal ✓

#### Test User Isolation:
1. Add some data as User A
2. Logout and login as User B
3. Verify User B cannot see User A's data (Firebase rules will enforce this)

### Step 3: Monitor Your Data

View your saved data in Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select ByteBite project
3. Go to **Firestore Database**
4. Expand the `users` collection to see user data
5. Each user has `calorieEntries` and `mealPlans` subcollections

## Data Structure

### Calorie Entry
```javascript
{
  food: string,              // e.g., "Chicken Breast"
  calories: number,          // e.g., 450
  mealType: string,          // "Breakfast", "Lunch", "Dinner", "Snack"
  timestamp: Timestamp,      // When created
  createdAt: Timestamp       // Server timestamp
}
```

### Meal Plan
```javascript
{
  date: string,              // "YYYY-MM-DD" format
  type: string,              // "Breakfast", "Lunch", "Dinner", "Snack"
  name: string,              // e.g., "Grilled Chicken Salad"
  calories: number | null,   // Optional
  time: string | null,       // Optional, "HH:MM" format
  createdAt: Timestamp,      // When created
  updatedAt: Timestamp       // Last modified
}
```

## Architecture Overview

```
ByteBite App
    ↓
CalorieTracker.vue / PlanMeal.vue
    ↓
firestoreUtils.js (Utility Functions)
    ↓
Firebase Auth (User Verification)
    ↓
Firestore Database (Data Storage)
    ↓
Security Rules (Permission Control)
```

## Important: Security Rules

Your Firestore security rules now enforce:

✅ **Allowed**:
- Users can read/write/delete their own `calorieEntries`
- Users can read/write/delete their own `mealPlans`
- Users can read/write/update their own profile

❌ **Not Allowed**:
- Users cannot read other users' data
- Unauthenticated users cannot write data
- Anyone trying to bypass rules will get permission errors

## Troubleshooting

### "Failed to load meal plans"
- Check if user is logged in
- Verify security rules are published
- Check browser console for error messages
- Ensure Firestore has write capacity

### Data not persisting
- Verify user is authenticated
- Check Firestore in Firebase Console to see if data exists
- Verify security rules allow the operation
- Check browser console for Firebase errors

### Old localStorage data
If you had meal plans in localStorage before, they will not automatically migrate. To migrate:

```javascript
// Temporary migration code (run once in browser console)
const oldMeals = JSON.parse(localStorage.getItem('mealPlans')) || []
console.log('Found', oldMeals.length, 'old meals to migrate')
// Data will be lost - use Firebase Console Firestore backup if needed
```

## File Changes

| File | Change | Purpose |
|------|--------|---------|
| `src/utils/firestoreUtils.js` | **NEW** | Centralized Firestore operations |
| `src/views/CalorieTracker.vue` | Updated | Uses new utilities |
| `src/views/PlanMeal.vue` | Major Update | Firebase integration |
| `firestore.rules` | **NEW** | Security rules |
| `FIRESTORE_IMPLEMENTATION.md` | **NEW** | Detailed documentation |

## Next: Real-Time Features (Optional)

To enable real-time data sync without manual refresh:
- Convert `getDocs()` to `onSnapshot()` in `firestoreUtils.js`
- Implement real-time listeners in components
- See `FIRESTORE_IMPLEMENTATION.md` for examples

## Support Resources

- **Firebase Documentation**: https://firebase.google.com/docs/firestore
- **Security Rules Guide**: https://firebase.google.com/docs/firestore/security/get-started
- **Firebase Console**: https://console.firebase.google.com/
- **Local Documentation**: See `FIRESTORE_IMPLEMENTATION.md` in your project

---

**✅ Your ByteBite app is now ready for persistent, user-specific data storage!**

