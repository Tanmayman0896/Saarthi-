# Saarthi - Inclusive Educational Platform

<div align="center">

  ### Empowering Abilities, Unlocking Potential: Education for All
 
</div>

## 🌟 Overview

Saarthi is an innovative, accessibility-focused educational platform designed to provide inclusive learning experiences for students with diverse abilities and learning needs. The platform emphasizes accessibility, multilingual support, and interactive learning to ensure education is truly available for everyone.

## 🎯 Mission

To create an inclusive learning environment that breaks down barriers for students with visual, auditory, and other accessibility challenges through innovative technology and thoughtful design.

## ✨ Key Features

### 🎤 **Voice Navigation & Speech Recognition**
- Voice-controlled navigation throughout the platform
- Speech-to-text capabilities for hands-free interaction
- Text-to-speech functionality for content accessibility
- Voice commands for course enrollment and navigation

### 🌍 **Multilingual Support**
- Content available in English, Hindi, and Marathi
- Dynamic language switching
- Regional language support for diverse learners
- Culturally appropriate content delivery

### ♿ **Accessibility Features**
- Screen reader compatibility
- High contrast themes with dark/light mode toggle
- Keyboard navigation support
- Braille text conversion capabilities
- Audio descriptions for visual content

### 📚 **Educational Content**
- **Science**: Interactive experiments and visual aids
- **Mathematics**: Step-by-step problem solving with visual representations
- **English**: Story-telling lectures and grammar lessons
- **Environmental Science**: Practical experiments and real-world applications

### 🔐 **User Management**
- Firebase Authentication integration
- Protected routes and role-based access control
- User profiles with accessibility preferences
- Admin panel for content and user management

### 🎨 **Interactive Learning**
- Video lectures with captions
- Interactive quizzes and assessments
- Progress tracking and analytics
- Discussion forums and peer learning

## 🛠️ Technology Stack

### **Frontend**
- **React 18.3.1**: Modern UI library with hooks and context
- **React Router 6.16.0**: Client-side routing
- **TailwindCSS 3.3.3**: Utility-first CSS framework
- **Chakra UI 2.8.1**: Accessible component library
- **Material UI 5.14.9**: React components for faster development

### **Backend & Database**
- **Firebase 10.14.1**: Authentication, Firestore database, hosting
- **Firestore**: NoSQL document database for user data and content

### **Accessibility & Voice**
- **react-speech-kit 3.0.1**: Text-to-speech functionality
- **react-speech-recognition 3.10.0**: Voice command recognition
- **braille 1.1.0**: Braille text conversion

### **UI & Styling**
- **Bootstrap 5.3.2**: Responsive design components
- **Framer Motion 10.16.4**: Smooth animations and transitions
- **React Icons 4.11.0**: Comprehensive icon library
- **DaisyUI 3.7.5**: TailwindCSS component library

### **Charts & Visualizations**
- **Chart.js 4.4.0** & **ApexCharts 3.42.0**: Data visualization
- **react-chartjs-2 5.2.0**: React wrapper for Chart.js

### **Development Tools**
- **Vercel Analytics**: Performance monitoring
- **EmailJS**: Contact form functionality
- **React Hot Toast**: User notifications

## 📁 Project Structure

```
saarthi/
├── public/                 # Static assets and images
│   ├── course images/      # Educational content images
│   ├── icons/             # Platform icons and logos
│   └── index.html         # Main HTML template
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ProtectedRoute.js
│   │   ├── FirebaseErrorBoundary.js
│   │   └── DiagnosticPage.js
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.js     # Authentication state
│   │   ├── ThemeContext.js    # Theme management
│   │   └── LanguageContext.js # Internationalization
│   ├── MyComponents/      # Main UI components
│   │   ├── Header.js          # Navigation header
│   │   ├── VoiceNav.js        # Voice navigation
│   │   ├── SubjectCards.js    # Course subject cards
│   │   ├── Catalogue.js       # Course catalog
│   │   └── login.js           # Authentication
│   ├── MyPages/          # Page components
│   │   ├── Hero.js            # Landing page
│   │   ├── Coursecat.js       # Course categories
│   │   ├── Science.js         # Science courses
│   │   ├── mathematics.js     # Math courses
│   │   ├── English.js         # English courses
│   │   └── AdminPanel.js      # Admin dashboard
│   ├── services/         # API and Firebase services
│   │   ├── userService.js     # User management
│   │   └── feedbackService.js # Feedback handling
│   ├── firebase.js       # Firebase configuration
│   ├── i18n.js          # Internationalization setup
│   └── App.js           # Main application component
├── package.json         # Dependencies and scripts
└── tailwind.config.js   # TailwindCSS configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 20.6.0 or higher)
- npm or yarn package manager
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Saarthi-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id (optional)
   REACT_APP_ADMIN_EMAIL=admin@example.com
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🚀 Deployment Guide

### **Vercel Deployment (Recommended)**

Vercel is the recommended platform for deploying this React application with optimal performance and accessibility features.

#### **Prerequisites**
- Vercel account (free at [vercel.com](https://vercel.com))
- Firebase project configured
- All environment variables ready

#### **Step-by-Step Deployment**

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   Choose your preferred authentication method (GitHub, GitLab, Bitbucket, or Email)

3. **Build the project locally** (optional, to test)
   ```bash
   npm run build
   ```

4. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   For production deployment:
   ```bash
   vercel --prod
   ```

5. **Configure Environment Variables**
   
   **Option A: Via Vercel CLI**
   ```bash
   vercel env add REACT_APP_FIREBASE_API_KEY production
   vercel env add REACT_APP_FIREBASE_AUTH_DOMAIN production
   vercel env add REACT_APP_FIREBASE_PROJECT_ID production
   vercel env add REACT_APP_FIREBASE_STORAGE_BUCKET production
   vercel env add REACT_APP_FIREBASE_MESSAGING_SENDER_ID production
   vercel env add REACT_APP_FIREBASE_APP_ID production
   vercel env add REACT_APP_FIREBASE_MEASUREMENT_ID production
   vercel env add REACT_APP_ADMIN_EMAIL production
   ```
   
   For each command, enter the corresponding value when prompted.

   **Option B: Via Vercel Dashboard**
   - Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → Environment Variables
   - Add each environment variable for Production, Preview, and Development

6. **Redeploy after adding environment variables**
   ```bash
   vercel --prod
   ```

#### **Environment Variables Checklist**
Ensure all these variables are set in Vercel:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
REACT_APP_ADMIN_EMAIL=admin@yourdomain.com
```

#### **Custom Domain Setup** (Optional)
1. Go to your project settings in Vercel Dashboard
2. Navigate to Domains section
3. Add your custom domain
4. Configure DNS settings as instructed

#### **Performance Optimizations**
The `vercel.json` configuration includes:
- Static asset caching (1 year cache for images, JS, CSS)
- SPA routing support
- Optimized build settings

### **Alternative Deployment Options**

#### **Netlify**
```bash
npm run build
# Upload build/ folder to Netlify or use Netlify CLI
netlify deploy --prod --dir=build
```

#### **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

#### **GitHub Pages**
```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
npm run deploy
```

### **Post-Deployment Checklist**

- [ ] All pages load correctly
- [ ] Firebase authentication works
- [ ] Voice navigation functions properly
- [ ] All images and assets load
- [ ] Responsive design works on mobile
- [ ] Accessibility features are functional
- [ ] Multi-language switching works
- [ ] Admin panel is accessible (if admin user)

### **Troubleshooting Deployment Issues**

#### **Build Errors**
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **Environment Variable Issues**
- Ensure all `REACT_APP_` variables are set
- Check variable names match exactly
- Verify Firebase project settings

#### **Routing Issues**
- Ensure SPA routing is configured in your hosting platform
- Check that all routes redirect to `index.html`

#### **Performance Issues**
- Enable compression in hosting settings
- Verify static asset caching
- Check bundle size with `npm run build`

## 🔧 Development

### **Available Scripts**

- `npm start`: Start development server
- `npm build`: Create production build
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

### **Testing**
The project includes comprehensive testing setup with:
- Jest for unit testing
- React Testing Library for component testing
- User event simulation

## 📈 Performance

### **Optimization Features**
- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization
- Progressive Web App capabilities

### **Analytics**
- Vercel Analytics integration
- User interaction tracking
- Performance monitoring
- Accessibility metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Accessibility Guidelines**
- Follow WCAG 2.1 AA standards
- Test with screen readers
- Ensure keyboard navigation
- Verify color contrast ratios

## 🐛 Known Issues & Troubleshooting

### **Voice Recognition**
- Requires Chrome browser for optimal performance
- Ensure microphone permissions are granted
- Check internet connection for voice services

### **Firebase Configuration**
- Verify all environment variables are set
- Check Firebase project permissions
- Ensure Firestore rules are properly configured

## 📄 License

This project is private and proprietary. All rights reserved.

## 👨‍💻 Development Team

- **Sarthak**: Backend Developer
- **Tanmoy**: Fullstack Developer
- **Pratishtha**: Content Creator

## 📞 Support

For technical support or accessibility assistance:
- Email: support@saarthi.edu
- Documentation: [Internal Wiki]
- Issues: [GitHub Issues]

## 🔮 Future Roadmap

- [ ] Mobile application development
- [ ] Advanced AI-powered accessibility features
- [ ] Enhanced voice commands
- [ ] Offline content capability
- [ ] Gamification elements
- [ ] Parent/Teacher dashboards
- [ ] Advanced analytics
- [ ] Integration with assistive technologies

---

<div align="center">
  <p><strong>Making Education Accessible to Everyone</strong></p>
  <p>Built with ❤️ for inclusive learning</p>
</div>
