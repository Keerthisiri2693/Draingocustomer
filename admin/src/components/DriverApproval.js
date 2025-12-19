import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Alert, Box } from '@mui/material';
import { Check, Close, Person, Phone, Badge, Home } from '@mui/icons-material';

const DriverApproval = () => {
  const { t } = useTranslation();
  const [pendingDrivers, setPendingDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'approve' or 'reject'

  useEffect(() => {
    fetchPendingDrivers();
  }, []);

  const fetchPendingDrivers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/pending-drivers');
      setPendingDrivers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (driverId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-driver/${driverId}`);
      fetchPendingDrivers();
      setOpenDialog(false);
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    }
  };

  const handleReject = async (driverId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject-driver/${driverId}`, {
        reason: rejectReason
      });
      fetchPendingDrivers();
      setOpenDialog(false);
      setRejectReason('');
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    }
  };

  const openApproveDialog = (driver) => {
    setSelectedDriver(driver);
    setDialogType('approve');
    setOpenDialog(true);
  };

  const openRejectDialog = (driver) => {
    setSelectedDriver(driver);
    setDialogType('reject');
    setOpenDialog(true);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {t('pendingDrivers')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {pendingDrivers.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('name')}</TableCell>
                <TableCell>{t('phone')}</TableCell>
                <TableCell>{t('licenseNumber')}</TableCell>
                <TableCell>{t('address')}</TableCell>
                <TableCell>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingDrivers.map((driver) => (
                <TableRow key={driver._id}>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.phoneNumber}</TableCell>
                  <TableCell>{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.address}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small" 
                      onClick={() => openApproveDialog(driver)} 
                      startIcon={<Check />}
                      sx={{ mr: 1 }}
                    >
                      {t('approve')}
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small" 
                      onClick={() => openRejectDialog(driver)} 
                      startIcon={<Close />}
                    >
                      {t('reject')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">{t('noData')}</Alert>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {dialogType === 'approve' ? t('approve') : t('reject')} {t('driverApproval')}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'reject' && (
            <TextField
              autoFocus
              margin="dense"
              label={t('reason')}
              fullWidth
              multiline
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
            />
          )}
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              <Person color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('name')}: {selectedDriver?.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Phone color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('phone')}: {selectedDriver?.phoneNumber}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Badge color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('licenseNumber')}: {selectedDriver?.licenseNumber}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Home color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('address')}: {selectedDriver?.address}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            {t('cancel')}
          </Button>
          <Button 
            onClick={() => dialogType === 'approve' 
              ? handleApprove(selectedDriver?._id) 
              : handleReject(selectedDriver?._id)}
            color={dialogType === 'approve' ? 'success' : 'error'}
            startIcon={dialogType === 'approve' ? <Check /> : <Close />}
          >
            {dialogType === 'approve' ? t('approve') : t('reject')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DriverApproval;