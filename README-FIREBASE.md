# Swan Dive PDX - Firebase Setup & Auto-Deployment Guide

This guide will help you deploy the Swan Dive PDX music venue website to Firebase with automatic GitHub deployment.

## 🚀 Quick Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Choose a project name (e.g., "swan-dive-pdx")
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Firebase Services

In your Firebase project:

#### Authentication
1. Go to Authentication → Sign-in method
2. Enable "Email/Password" provider
3. Create an admin user in Authentication → Users
4. Note the User UID

#### Firestore Database
1. Go to Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location closest to your users

#### Storage
1. Go to Storage
2. Click "Get started"
3. Use default security rules for now

### 3. Add Admin User to Firestore

1. Go to Firestore Database
2. Create a collection called "admins"
3. Add a document with the User UID from step 2
4. Document content: `{ "role": "admin", "email": "your-admin-email@example.com" }`

### 4. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register your app
5. Copy the Firebase configuration object

### 5. Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## 🔧 Local Development

### Install Dependencies
```bash
npm install
```

### Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Login to Firebase
```bash
firebase login
```

### Initialize Firebase (if not already done)
```bash
firebase init
```

Select:
- Firestore
- Hosting
- Storage

### Run Development Server
```bash
npm run dev
```

### Run Firebase Emulators (Optional)
```bash
npm run firebase:dev
```

## 🚢 Manual Deployment

### Build and Deploy
```bash
npm run build
npm run deploy
```

Or use Firebase CLI directly:
```bash
firebase deploy
```

## 🤖 Automatic GitHub Deployment

### 1. GitHub Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions.

Add these secrets:

#### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
FIREBASE_PROJECT_ID=your-project-id
```

#### Service Account Key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the entire JSON content
5. Add as secret: `FIREBASE_SERVICE_ACCOUNT=<entire-json-content>`

### 2. Push to GitHub

The GitHub Action will automatically:
- Install dependencies
- Build the project
- Deploy to Firebase Hosting

Every push to `main` branch triggers deployment!

## 📱 Features

### For Users
- ✅ Browse upcoming shows
- ✅ Interactive calendar view
- ✅ Individual show details
- ✅ Ticket purchase links
- ✅ Responsive design
- ✅ Real-time updates

### For Admins
- ✅ Secure login system
- ✅ Add/edit/delete shows
- ✅ Image upload to Firebase Storage
- ✅ Real-time data sync
- ✅ Admin-only access controls

## 🔒 Security

- Firestore rules protect admin operations
- Storage rules control image uploads
- Authentication required for admin panel
- Real-time security rules enforcement

## 🔧 Customization

### Adding More Admins
1. Create user in Authentication
2. Add user UID to `admins` collection in Firestore

### Modifying Venue Info
Update `VENUE_INFO` in `src/lib/types.ts`

### Styling Changes
- Colors: Update Tailwind classes (currently teal theme)
- Layout: Modify components in `src/components/`
- Logo: Replace SVG in navigation component

## 📊 Analytics & Monitoring

### Firebase Analytics
- Automatically tracks page views
- User engagement metrics
- Real-time user activity

### Error Monitoring
- Built-in error tracking
- Performance monitoring
- Crashlytics for mobile web

## 🛠️ Troubleshooting

### Build Errors
- Check environment variables are set
- Ensure Firebase config is correct
- Verify all dependencies installed

### Deployment Issues
- Check Firebase CLI is logged in
- Verify project permissions
- Check GitHub secrets are set correctly

### Authentication Problems
- Verify admin user exists in Firestore
- Check Authentication settings
- Ensure admin collection document exists

## 📞 Support

For issues with:
- Firebase setup: Check [Firebase Documentation](https://firebase.google.com/docs)
- GitHub Actions: Check [Actions Documentation](https://docs.github.com/en/actions)
- Next.js: Check [Next.js Documentation](https://nextjs.org/docs)

## 🎉 You're Done!

Your Swan Dive PDX website now has:
- ✅ Real-time database with Firestore
- ✅ Secure admin authentication
- ✅ Image uploads to Firebase Storage
- ✅ Automatic GitHub deployment
- ✅ Production-ready hosting
- ✅ SSL certificate included
- ✅ Global CDN distribution

Every push to your main branch automatically deploys your changes! 🚀
