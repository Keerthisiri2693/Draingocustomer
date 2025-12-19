import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, CircularProgress, Alert, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { AttachMoney, Edit, LocationOn } from '@mui/icons-material';

const RateManagement = () => {
  const { t } = useTranslation();
  const [areaRates, setAreaRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [newRate, setNewRate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchAreaRates();
  }, []);

  const fetchAreaRates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/area-rates');
      setAreaRates(response.data);
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/area-rates/${selectedArea}`, {
        rate: parseFloat(newRate)
      });
      fetchAreaRates();
      setOpenDialog(false);
      setNewRate('');
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    }
  };

  const openUpdateDialog = (area, currentRate) => {
    setSelectedArea(area);
    setNewRate(currentRate.toString());
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
        {t('rateManagement')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {areaRates.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('area')}</TableCell>
                <TableCell>{t('currentRate')}</TableCell>
                <TableCell>{t('vehicleCount')}</TableCell>
                <TableCell>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {areaRates.map((areaRate, index) => (
                <TableRow key={index}>
                  <TableCell>{areaRate.area}</TableCell>
                  <TableCell>₹{areaRate.averageRate.toFixed(2)}</TableCell>
                  <TableCell>{areaRate.vehicleCount}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small" 
                      onClick={() => openUpdateDialog(areaRate.area, areaRate.averageRate)}
                      startIcon={<Edit />}
                    >
                      {t('updateRate')}
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

      {/* Update Rate Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          <LocationOn color="primary" sx={{ verticalAlign: 'middle', mr: 1 }} />
          {t('updateRate')} - {selectedArea}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            {t('currentRate')}: ₹{parseFloat(newRate).toFixed(2)}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label={t('newRate')}
            type="number"
            fullWidth
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            InputProps={{
              startAdornment: <AttachMoney color="action" sx={{ mr: 1 }} />
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            {t('cancel')}
          </Button>
          <Button 
            onClick={handleUpdateRate} 
            color="primary" 
            startIcon={<AttachMoney />}
          >
            {t('updateRate')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RateManagement;