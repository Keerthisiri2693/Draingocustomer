import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Alert, Box } from '@mui/material';
import { Check, Close, Person, Business, Email, Phone, Info } from '@mui/icons-material';

const OwnerApproval = () => {
  const { t } = useTranslation();
  const [pendingOwners, setPendingOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'approve' or 'reject'

  useEffect(() => {
    fetchPendingOwners();
  }, []);

  const fetchPendingOwners = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/pending-owners');
      setPendingOwners(response.data);
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (ownerId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-owner/${ownerId}`);
      fetchPendingOwners();
      setOpenDialog(false);
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    }
  };

  const handleReject = async (ownerId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject-owner/${ownerId}`, {
        reason: rejectReason
      });
      fetchPendingOwners();
      setOpenDialog(false);
      setRejectReason('');
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    }
  };

  const openApproveDialog = (owner) => {
    setSelectedOwner(owner);
    setDialogType('approve');
    setOpenDialog(true);
  };

  const openRejectDialog = (owner) => {
    setSelectedOwner(owner);
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
        {t('pendingOwners')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {pendingOwners.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('name')}</TableCell>
                <TableCell>{t('email')}</TableCell>
                <TableCell>{t('phone')}</TableCell>
                <TableCell>{t('businessName')}</TableCell>
                <TableCell>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingOwners.map((owner) => (
                <TableRow key={owner._id}>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.phoneNumber}</TableCell>
                  <TableCell>{owner.businessName}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="success" 
                      size="small" 
                      onClick={() => openApproveDialog(owner)} 
                      startIcon={<Check />}
                      sx={{ mr: 1 }}
                    >
                      {t('approve')}
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      size="small" 
                      onClick={() => openRejectDialog(owner)} 
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
          {dialogType === 'approve' ? t('approve') : t('reject')} {t('ownerApproval')}
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
              {t('name')}: {selectedOwner?.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Email color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('email')}: {selectedOwner?.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Phone color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('phone')}: {selectedOwner?.phoneNumber}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <Business color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
              {t('businessName')}: {selectedOwner?.businessName}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            {t('cancel')}
          </Button>
          <Button 
            onClick={() => dialogType === 'approve' 
              ? handleApprove(selectedOwner?._id) 
              : handleReject(selectedOwner?._id)}
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

export default OwnerApproval;