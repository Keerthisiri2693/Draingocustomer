import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AppIcon = ({ type, name, size = 22, color = '#333' }: any) => {
  switch (type) {
    case 'ion':
      return <Ionicons name={name} size={size} color={color} />;
    case 'material':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'fa5':
      return <FontAwesome5 name={name} size={size} color={color} solid />;
    case 'ant':
      return <AntDesign name={name} size={size} color={color} />;
    default:
      return null;
  }
};

export default AppIcon;
