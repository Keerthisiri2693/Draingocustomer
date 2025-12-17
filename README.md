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