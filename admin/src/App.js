import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OwnerApproval from './components/OwnerApproval';
import DriverApproval from './components/DriverApproval';
import RateManagement from './components/RateManagement';
import FeedbackView from './components/FeedbackView';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Box, Container } from '@mui/material';
import './i18n';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Routes>
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route 
              path="/owner-approval" 
              element={isAuthenticated ? <OwnerApproval /> : <Navigate to="/login" />}
            />
            <Route 
              path="/driver-approval" 
              element={isAuthenticated ? <DriverApproval /> : <Navigate to="/login" />}
            />
            <Route 
              path="/rate-management" 
              element={isAuthenticated ? <RateManagement /> : <Navigate to="/login" />}
            />
            <Route 
              path="/feedback" 
              element={isAuthenticated ? <FeedbackView /> : <Navigate to="/login" />}
            />
            <Route 
              path="*" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
            />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;