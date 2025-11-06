# ByteBite 🍽️
Website Link - https://bbytebite.vercel.app/
Git Repo - https://github.com/nicca1225/ByteBite

Smart Meal Planning for Students - A modern Vue.js web application with Firebase authentication and comprehensive form validation.

## ✨ Features

- 🔍 **Recipe Discovery** - Search and explore thousands of recipes from Spoonacular API with detailed nutrition information
- 📅 **Meal Planner** - Plan your weekly meals and organize your diet efficiently
- 🔥 **Calorie Tracker** - Log daily food intake and monitor your calorie consumption with visual charts
- 💰 **Budget Tracker** - Track grocery spending and manage your food budget with analytics
- 🛒 **Smart Shopping List** - Create shopping lists with AI-generated Singapore grocery prices
- ❤️ **Save Favorites** - Bookmark and save your favorite recipes for quick access
- 👤 **User Profiles** - Manage dietary preferences, allergies, and personal nutrition goals
- 🔐 **Secure Authentication** - Email/password and Google Sign-In with Firebase
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 📊 **Visual Analytics** - Interactive charts and graphs for budget and calorie tracking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** (version 8.0.0 or higher) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ByteBite
```

### 2. Install Dependencies
```bash
npm install
```

This will install all dependencies including:
- Vue.js 3
- Vite
- Tailwind CSS
- PostCSS & Autoprefixer
- Vue Router
- Pinia

### 3. Firebase Setup
Set up Firebase for authentication:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication:
   - Email/Password provider
   - Google Sign-In provider
4. Enable Firestore Database
5. Copy your Firebase configuration

### 4. Environment Configuration
Create a `.env` file in the root directory:
```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your Firebase and Gemini API credentials:
```
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Gemini AI Pricing Service (for Shopping List ingredient pricing)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

#### Getting Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the generated key and paste it in `.env`
4. The Gemini API has a free tier - no credit card required

**Note**: The app will work without a Gemini API key, but ingredient pricing on the Shopping List will use fallback hardcoded prices instead of AI-generated estimates.

## 🚀 Running the Application

### Development Mode
Start the development server with hot module replacement:
```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

### Production Build
Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
ByteBite/
├── .git/                          # Git repository
├── .env                           # Environment variables (API keys & Firebase config)
├── .gitignore                     # Git ignore rules
├── firestore.rules                # Firestore security rules
├── firebase.json                  # Firebase hosting configuration
├── vercel.json                    # Vercel deployment config
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite build configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── README.md                      # Project documentation
├── dist/                          # Production build output (generated)
├── node_modules/                  # Installed dependencies
├── public/                        # Static assets (logo, images)
└── src/
    ├── main.js                    # Vue application entry point
    ├── App.vue                    # Root component
    ├── style.css                  # Global styles with Tailwind directives
    ├── assets/                    # Images and fonts
    ├── config/
    │   └── firebase.js            # Firebase initialization
    ├── router/
    │   └── index.js               # Vue Router configuration with auth guards
    ├── stores/                    # Pinia state management
    │   ├── auth.js                # Authentication state
    │   ├── calorieStore.js        # Calorie tracking state
    │   ├── mealPlanStore.js       # Meal planning state
    │   ├── favourites.js          # Saved recipes state
    │   └── preferencesStore.js    # User preferences state
    ├── services/                  # Business logic
    │   ├── geminiPricingService.js    # AI price generation for ingredients
    │   └── ingredientNormalizer.js    # Normalize ingredient names
    ├── components/                # Reusable Vue components
    │   ├── AddMealModal.vue
    │   ├── EditMealModal.vue
    │   ├── CalorieTrackerOverview.vue
    │   └── ...
    ├── views/                     # Page components
    │   ├── Landing.vue            # Welcome page
    │   ├── Login.vue              # Login page
    │   ├── Register.vue           # Registration page
    │   ├── UserHome.vue           # Dashboard
    │   ├── Profile.vue            # User profile
    │   ├── FindRecipes.vue        # Recipe discovery
    │   ├── RecipeDetail.vue       # Recipe details
    │   ├── CalorieTracker.vue     # Calorie tracking
    │   ├── PlanMeal.vue           # Meal planning
    │   ├── BudgetTracker.vue      # Budget management
    │   ├── Favourites.vue         # Saved recipes
    │   ├── ShoppingList.vue       # Shopping list
    │   └── About.vue              # About page
    └── utils/
        ├── firestoreUtils.js      # Firestore database utilities
        └── toast.js               # Toast notification utilities
```

## 🤖 AI Declaration

This project utilized AI assistance for:
- **Code cleanup and refactoring** - Improving code quality and maintainability
- **Commit message generation** - Creating clear and descriptive Git commit messages
- **Documentation** - Updating and organizing README sections


