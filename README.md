# ByteBite 🍽️

Smart Meal Planning for Students - A modern Vue.js web application with Firebase authentication and comprehensive form validation.

## ✨ Features

- 🔐 **Firebase Authentication** - Email/password and Google Sign-In
- 🎨 **Beautiful UI** - Modern, responsive design with Tailwind CSS
- 🛡️ **Secure Routing** - Protected routes with auto-redirects
- 🔔 **Toast Notifications** - Real-time success/error messages
- ✅ **Form Validation** - Comprehensive validation with visual feedback
- 💪 **Password Strength** - Real-time password strength indicator
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Vue.js 3** with Composition API
- 🔥 **Vite** for lightning-fast development

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
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── components/         # Reusable Vue components
│   │   └── HelloWorld.vue
│   ├── router/            # Vue Router configuration
│   │   └── index.js
│   ├── stores/            # Pinia state management
│   │   └── counter.js
│   ├── views/             # Page components
│   │   ├── Home.vue
│   │   └── About.vue
│   ├── App.vue            # Root component
│   ├── main.js            # Application entry point
│   └── style.css          # Global styles with Tailwind directives
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## 🎨 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |
| `npm run format` | Format code with Prettier |

## 🛠️ Development

### Adding New Components
Create new components in the `src/components/` directory:
```vue
<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ title }}</h2>
    <p class="text-gray-600">Your component content here</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    title: String
  }
}
</script>
```

### Adding New Pages
1. Create a new Vue component in `src/views/`
2. Add the route in `src/router/index.js`:
```javascript
{
  path: '/new-page',
  name: 'newPage',
  component: () => import('../views/NewPage.vue')
}
```

### State Management with Pinia
Create stores in `src/stores/`:
```javascript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('myStore', () => {
  const data = ref([])
  
  function addItem(item) {
    data.value.push(item)
  }
  
  return { data, addItem }
})
```

## 🎯 Code Quality

### ESLint
The project uses ESLint for code quality. Run the linter:
```bash
npm run lint
```

### Prettier
Code formatting is handled by Prettier:
```bash
npm run format
```

## 🎨 Tailwind CSS

This project uses Tailwind CSS for styling with:
- **Utility-first approach** - Build custom designs without leaving HTML
- **Responsive design** - Mobile-first breakpoints and responsive utilities
- **Custom color palette** - Primary and secondary color schemes
- **Component classes** - Reusable component styles in `@layer components`
- **Custom animations** - Fade-in, slide-up, and gentle bounce effects

### Tailwind Configuration
- **Colors**: Custom primary and secondary color palettes
- **Fonts**: Inter font family with system font fallbacks
- **Animations**: Custom keyframes and animation utilities
- **Content paths**: Configured to scan all Vue files for classes

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` file contains:
- Vue plugin configuration
- Path aliases (`@` for `src/`)
- PostCSS configuration for Tailwind CSS
- Development server settings
- Build optimization

### Environment Variables
Use environment variables for configuration:
- `VITE_APP_TITLE`: Application title
- `VITE_API_BASE_URL`: API base URL
- `VITE_DEBUG`: Debug mode flag

## 🚀 Deployment

### Pre-Deployment Checklist
Before deploying, ensure you have:
- ✅ All dependencies installed: `npm install`
- ✅ Firebase project created and configured
- ✅ Gemini API key obtained
- ✅ All environment variables set in `.env`
- ✅ Local testing completed: `npm run dev`

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Preview Production Build Locally
```bash
npm run preview
```

Test the production build on your local machine before deploying.

### Environment Variables for Deployment

When deploying to a hosting platform, you **MUST** set these environment variables:

#### Firebase Variables (Required)
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

#### Gemini Variables (Required for AI Pricing)
```
VITE_GEMINI_API_KEY
```

### Deployment Options

#### **Option 1: Netlify** (Recommended for Beginners)
1. Connect your GitHub repository to [Netlify](https://netlify.com)
2. In Netlify project settings, go to **Build & Deploy > Environment**
3. Add all environment variables from your `.env` file
4. Deploy settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy"

#### **Option 2: Vercel**
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. In project settings, go to **Environment Variables**
3. Add all environment variables from your `.env` file
4. Vercel auto-detects Vue.js and Vite configuration
5. Click "Deploy"

#### **Option 3: GitHub Pages**
1. Build the app: `npm run build`
2. Commit and push the `dist/` folder
3. In GitHub repository settings:
   - Go to **Pages**
   - Set source to `dist` folder
   - Click "Save"

#### **Option 4: AWS S3 + CloudFront**
1. Build the app: `npm run build`
2. Create an S3 bucket for static website hosting
3. Upload contents of `dist/` to S3
4. Configure CloudFront for CDN distribution
5. Note: Set up redirects for Vue Router single-page app

#### **Option 5: Manual Hosting (VPS, Shared Hosting)**
1. Build the app: `npm run build`
2. Upload the `dist/` folder to your web server
3. Configure your web server to serve `index.html` for all routes
4. Example for Apache `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Troubleshooting Deployment

#### Issue: "Failed to resolve import @google/generative-ai"
**Solution**: Run `npm install` before deploying. This error occurs when dependencies aren't installed.

#### Issue: Gemini API key not working
**Solution**:
- Verify the key is set in environment variables on your hosting platform
- Check the key is active in [Google AI Studio](https://aistudio.google.com/app/apikey)
- The app will continue working with fallback prices if the key is missing

#### Issue: Firebase authentication not working
**Solution**:
- Verify all Firebase environment variables are correct
- Check Firebase project has Authentication and Firestore enabled
- Verify authorized domains in Firebase Console includes your deployment domain

#### Issue: Blank page after deployment
**Solution**:
- Check browser console for errors
- Verify all environment variables are set on hosting platform
- Ensure web server is configured to serve SPA (single-page application) properly
- Check that the `dist/` folder was deployed correctly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Vue.js Documentation](https://vuejs.org/guide/)
2. Review the [Vite Documentation](https://vitejs.dev/guide/)
3. Search existing [GitHub Issues](https://github.com/your-repo/issues)
4. Create a new issue with detailed information

## 🎉 Getting Started

1. **Install dependencies**: `npm install`
2. **Start development**: `npm run dev`
3. **Open your browser**: http://localhost:3000
4. **Start coding**: Edit files in `src/` and see changes instantly!

Happy coding! 🚀