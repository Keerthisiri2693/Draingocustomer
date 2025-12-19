import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Box, Alert } from '@mui/material';
import { Lock, Person } from '@mui/icons-material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        username,
        password
      });

      if (response.data.message === 'Admin login successful') {
        localStorage.setItem('adminToken', 'admin-auth-token');
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        onLogin();
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Lock color="primary" sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h5" component="h1">
            {t('welcome')}
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label={t('username')}
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: <Person color="action" sx={{ mr: 1 }} />
            }}
            required
          />

          <TextField
            label={t('password')}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <Lock color="action" sx={{ mr: 1 }} />
            }}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={loading}
          >
            {loading ? t('loading') : t('login')}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;