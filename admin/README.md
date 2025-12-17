# Admin Dashboard - Drain Management System

This is the React.js admin dashboard for the Drain Management System.

## Features

- **Admin Login System**: Secure authentication for admin users
- **Document Approval System**: Approve/reject owner and driver registrations
- **Owner & Driver Details Approval**: Review and manage pending approvals
- **Area-wise Rate Management**: Set and update rates for different areas
- **Customer Feedback Viewing**: View all customer feedback and ratings
- **Multi-language Support**: English, Tamil, Telugu, Kannada, Malayalam

## Installation

1. Navigate to the admin directory:
   ```bash
   cd admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Running with Backend

To run both the backend and admin dashboard simultaneously:

```bash
npm run full:dev
```

This will start both the Node.js backend and React admin dashboard.

## Available Scripts

- `npm start`: Start development server
- `npm run build`: Create production build
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## Environment Variables

The admin dashboard connects to the backend at `http://localhost:5000`. Make sure the backend server is running.

## Admin Credentials

For testing purposes, you can use:
- Username: `admin`
- Password: `admin123`

## Folder Structure

```
admin/
├── public/          # Public assets
├── src/             # Source code
│   ├── components/  # React components
│   ├── locales/     # Translation files
│   ├── App.js       # Main app component
│   ├── index.js     # Entry point
│   └── i18n.js      # Internationalization config
├── package.json     # Project configuration
└── README.md        # This file
```

## Technologies Used

- React.js 18
- Material-UI (MUI) 5
- React Router 6
- i18next for internationalization
- Axios for API calls
- Formik & Yup for form validation

## API Endpoints

The admin dashboard connects to the following backend endpoints:

- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/pending-owners` - Get pending owner approvals
- `PUT /api/admin/approve-owner/:ownerId` - Approve owner
- `PUT /api/admin/reject-owner/:ownerId` - Reject owner
- `GET /api/admin/pending-drivers` - Get pending driver approvals
- `PUT /api/admin/approve-driver/:driverId` - Approve driver
- `PUT /api/admin/reject-driver/:driverId` - Reject driver
- `GET /api/admin/feedback` - Get all feedback
- `GET /api/admin/area-rates` - Get area-wise rates
- `PUT /api/admin/area-rates/:area` - Update area rates
- `GET /api/admin/stats` - Get dashboard statistics

## Language Support

The dashboard supports 5 languages:
- English (en)
- Tamil (ta)
- Telugu (te)
- Kannada (kn)
- Malayalam (ml)

You can switch languages using the language selector in the navbar.