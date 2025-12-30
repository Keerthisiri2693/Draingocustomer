// Language Selector Component for Admin Dashboard
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, IconButton, Typography } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="language"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'language-button' }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            selected={i18n.language === lang.code}
            onClick={() => changeLanguage(lang.code)}
          >
            <Typography textAlign="center">{lang.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelector;