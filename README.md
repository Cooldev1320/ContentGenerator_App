# Content Generator App

A powerful React Native application for creating and managing visual content projects. This app provides a comprehensive canvas-based editor with templates, project management, and export capabilities.
<video src="https://github.com/user-attachments/assets/282e2def-58b0-46bc-b2f3-92a758b048c8" autoplay loop muted playsinline width="600"></video>

## Features

- 🎨 **Canvas Editor**: Interactive design canvas with text, shapes, and image elements
- 📋 **Template System**: Pre-built templates for various content types (social media, banners, etc.)
- 📱 **Mobile-First Design**: Optimized for mobile devices with touch-friendly interface
- 💾 **Project Management**: Save, organize, and manage your content projects
- 📤 **Export Options**: Export your designs in multiple formats (PNG, JPG, PDF)
- 🔐 **Authentication**: Secure user authentication and project ownership
- 📊 **Dashboard**: Overview of your projects, stats, and recent activity
- 🎯 **Real-time Editing**: Live preview and editing capabilities

## Tech Stack

- **React Native** 0.81.1 - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation and routing
- **NativeWind** - Tailwind CSS for React Native
- **Zustand** - State management
- **React Hook Form** - Form handling
- **AsyncStorage** - Local data persistence
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions

## Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard-specific components
│   ├── editor/         # Canvas editor components
│   ├── forms/          # Form components
│   ├── history/        # Project history components
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   ├── templates/      # Template-related components
│   └── ui/             # Basic UI components (Button, Card, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
├── navigation/         # Navigation setup and screens
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── dashboard/      # Main app screens
│   └── tabs/           # Tab-based screens
├── services/           # API and external services
├── store/              # State management (Zustand stores)
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Key Features Explained

### Canvas Editor
- Interactive design canvas with drag-and-drop functionality
- Support for text, shapes, lines, and images
- Real-time property editing
- Layer management system
- Undo/redo functionality

### Template System
- Pre-built templates for various content types
- Category-based template organization
- Template preview and selection
- Custom template creation

### Project Management
- Create, save, and organize projects
- Project status tracking (Draft, Published, Archived)
- Project history and versioning
- Thumbnail generation

### Authentication
- User registration and login
- Secure project ownership
- User profile management

## Development

### Prerequisites
- Node.js >= 20
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Available Scripts

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run tests
npm test

# Lint code
npm run lint
```

## Configuration

The app uses several configuration files:

- `tailwind.config.js` - Tailwind CSS configuration for styling
- `babel.config.js` - Babel configuration for JavaScript/TypeScript compilation
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration

## State Management

The app uses Zustand for state management with the following stores:

- `authStore` - User authentication state
- `canvasStore` - Canvas editor state and operations
- Additional stores for specific features

## Styling

The app uses NativeWind (Tailwind CSS for React Native) for consistent styling across components. Global styles are defined in `global.css` and component-specific styles use StyleSheet.

## Data Persistence

- Local storage using AsyncStorage for offline functionality
- Project data and user preferences are stored locally
- Canvas state is persisted between sessions

## Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## Learn More

To learn more about React Native and the technologies used in this project:

- [React Native Website](https://reactnative.dev) - learn more about React Native
- [NativeWind Documentation](https://www.nativewind.dev/) - Tailwind CSS for React Native
- [Zustand Documentation](https://github.com/pmndrs/zustand) - State management library
- [React Navigation](https://reactnavigation.org/) - Navigation library for React Native
