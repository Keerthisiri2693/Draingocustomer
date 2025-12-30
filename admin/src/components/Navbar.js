import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Logout, Language } from '@mui/icons-material';

const Navbar = ({ onLogout }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('dashboard')}
        </Typography>
        
        <IconButton color="inherit" onClick={handleLanguageMenuOpen}>
          <Language />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('ta')}>தமிழ்</MenuItem>
          <MenuItem onClick={() => changeLanguage('te')}>తెలుగు</MenuItem>
          <MenuItem onClick={() => changeLanguage('kn')}>ಕನ್ನಡ</MenuItem>
          <MenuItem onClick={() => changeLanguage('ml')}>മലയാളം</MenuItem>
          <MenuItem onClick={() => changeLanguage('hi')}>हिन्दी</MenuItem>
        </Menu>

        <Button color="inherit" onClick={onLogout} startIcon={<Logout />}>
          {t('logout')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;