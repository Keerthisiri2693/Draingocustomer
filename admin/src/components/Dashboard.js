import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Box } from '@mui/material';
import { People, DriveEta, LocalTaxi, CalendarToday, Feedback } from '@mui/icons-material';

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.message || t('error'));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [t]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {t('dashboard')}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{t('totalOwners')}</Typography>
              <Typography variant="h4">{stats?.ownerCount || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <People color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{t('totalDrivers')}</Typography>
              <Typography variant="h4">{stats?.driverCount || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <DriveEta color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{t('totalVehicles')}</Typography>
              <Typography variant="h4">{stats?.vehicleCount || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <CalendarToday color="info" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">{t('totalBookings')}</Typography>
              <Typography variant="h4">{stats?.bookingCount || 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {t('recentBookings')}
      </Typography>

      {stats?.recentBookings?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('customerName')}</TableCell>
                <TableCell>{t('vehicleNumber')}</TableCell>
                <TableCell>{t('date')}</TableCell>
                <TableCell>{t('status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.recentBookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{booking.customer?.name || t('noData')}</TableCell>
                  <TableCell>{booking.vehicle?.vehicleNumber || t('noData')}</TableCell>
                  <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">{t('noData')}</Alert>
      )}
    </div>
  );
};

export default Dashboard;