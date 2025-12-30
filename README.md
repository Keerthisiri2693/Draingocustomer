<<<<<<< HEAD
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

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

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
=======
# Drain Full-Stack Application

A comprehensive full-stack application with React Native mobile apps for Customer, Driver, and Owner roles, and a Node.js/Express backend with MongoDB.

## Project Structure

```
drain-fullstack/
├── server/                  # Node.js/Express backend
│   ├── config/              # Configuration files
│   │   ├── db.js            # MongoDB connection
│   │   └── config.js        # Server configuration
│   ├── routes/              # API routes
│   │   ├── customerRoutes.js
│   │   ├── driverRoutes.js
│   │   ├── ownerRoutes.js
│   │   └── adminRoutes.js   # Admin routes
│   └── index.js             # Main server entry
│
├── mobile/                 # React Native mobile apps
│   ├── customer/            # Customer app
│   │   ├── screens/         # App screens
│   │   │   ├── HomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── App.js           # App entry point
│   │   └── package.json
│   │
│   ├── driver/              # Driver app
│   │   ├── screens/         # App screens
│   │   │   ├── HomeScreen.js
│   │   │   ├── LoginScreen.js
│   │   │   └── RegisterScreen.js
│   │   ├── App.js           # App entry point
│   │   └── package.json
│   │
│   └── owner/               # Owner app
│       ├── screens/         # App screens
│       │   ├── HomeScreen.js
│       │   ├── LoginScreen.js
│       │   └── RegisterScreen.js
│       ├── App.js           # App entry point
│       └── package.json
│
├── admin/                  # React.js Admin Dashboard
│   ├── public/              # Public assets
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── locales/         # Translation files
│   │   ├── App.js           # Main app component
│   │   ├── index.js         # Entry point
│   │   └── i18n.js          # Internationalization config
│   ├── package.json         # Project configuration
│   └── README.md            # Admin documentation
│
├── .env                    # Environment variables
├── package.json            # Root package.json
└── README.md               # Project documentation
```

## Setup Instructions

### Backend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example` and configure your MongoDB connection.

3. Start the development server:
   ```bash
   npm run dev
   ```

### Admin Dashboard Setup

1. Install admin dashboard dependencies:
   ```bash
   npm run admin:install
   ```

2. Start the admin dashboard:
   ```bash
   npm run admin:start
   ```

3. To run both backend and admin dashboard together:
   ```bash
   npm run full:dev
   ```

### Mobile Apps Setup

For each mobile app (customer, driver, owner):

1. Navigate to the app directory:
   ```bash
   cd mobile/customer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React Native development server:
   ```bash
   npm start
   ```

4. Run on Android or iOS:
   ```bash
   npm run android
   # or
   npm run ios
   ```

## Features

### Implemented Features

**Admin Dashboard:**
- ✅ Admin login system with authentication
- ✅ Document approval system for drivers and owners
- ✅ Driver and owner details approval interface
- ✅ Area-wise rate management
- ✅ Customer feedback viewing system
- ✅ Multi-language support (English, Tamil, Telugu, Kannada, Malayalam)
- ✅ Dashboard statistics and analytics

**Backend:**
- ✅ RESTful API endpoints for all admin functions
- ✅ MongoDB integration with Mongoose models
- ✅ Admin authentication routes
- ✅ Owner and driver approval workflows
- ✅ Rate management system
- ✅ Feedback retrieval and management

**Mobile Apps (Structure):**
- ✅ Customer app structure with login/registration
- ✅ Driver app structure with login/registration
- ✅ Owner app structure with login/registration

### Features To Be Implemented

- User authentication and authorization for mobile apps
- Role-based access control
- Real-time location tracking for drivers
- Order management system
- Payment integration
- Notifications

## Technology Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Admin Dashboard**: React.js, Material-UI, React Router, i18next
- **Mobile**: React Native
- **Navigation**: React Navigation
- **State Management**: (To be determined)
- **Authentication**: JWT
- **Internationalization**: i18next, react-i18next
- **Form Validation**: Formik, Yup

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/drain_app
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
API_BASE_URL=http://localhost:5000/api
```

## Development Workflow

1. Implement backend API endpoints
2. Create React Native UI components
3. Connect mobile apps to backend APIs
4. Implement authentication flow
5. Add real-time features
6. Test and debug

## Notes

- This is a basic project structure setup
- Actual feature implementation will be done in subsequent phases
- All screens are placeholders and need to be implemented
>>>>>>> dbd21818e23cb147be2e744a18633f3de130f9c1
