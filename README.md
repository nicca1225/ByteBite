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

Edit `.env` with your Firebase credentials:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

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

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The `dist/` folder can be deployed to any static hosting service:
- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Use GitHub Actions
- **AWS S3**: Upload the `dist/` folder

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