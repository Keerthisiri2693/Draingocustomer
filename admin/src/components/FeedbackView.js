import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Box, Rating } from '@mui/material';
import { Feedback, Star, CalendarToday, Person, DriveEta } from '@mui/icons-material';

const FeedbackView = () => {
  const { t } = useTranslation();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/feedback');
      setFeedbacks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || t('error'));
    } finally {
      setLoading(false);
    }
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
        {t('feedbackList')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {feedbacks.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('customerName')}</TableCell>
                <TableCell>{t('vehicleNumber')}</TableCell>
                <TableCell>{t('rating')}</TableCell>
                <TableCell>{t('comment')}</TableCell>
                <TableCell>{t('date')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Person color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {feedback.customer?.name || t('noData')}
                  </TableCell>
                  <TableCell>
                    <DriveEta color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {feedback.vehicle?.vehicleNumber || t('noData')}
                  </TableCell>
                  <TableCell>
                    <Rating 
                      name="read-only" 
                      value={feedback.rating} 
                      readOnly 
                      precision={0.5}
                    />
                  </TableCell>
                  <TableCell>{feedback.comment || '-'}</TableCell>
                  <TableCell>
                    <CalendarToday color="action" sx={{ verticalAlign: 'middle', mr: 1 }} />
                    {new Date(feedback.createdAt).toLocaleString()}
                  </TableCell>
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

export default FeedbackView;