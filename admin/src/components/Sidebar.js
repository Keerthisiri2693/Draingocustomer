import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Dashboard, People, DriveEta, AttachMoney, Feedback, PersonAdd, LocalTaxi } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = [
    { text: t('dashboard'), icon: <Dashboard />, path: '/dashboard' },
    { text: t('ownerApproval'), icon: <PersonAdd />, path: '/owner-approval' },
    { text: t('driverApproval'), icon: <LocalTaxi />, path: '/driver-approval' },
    { text: t('rateManagement'), icon: <AttachMoney />, path: '/rate-management' },
    { text: t('feedback'), icon: <Feedback />, path: '/feedback' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem button key={index} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;