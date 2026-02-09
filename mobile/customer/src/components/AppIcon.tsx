import React from 'react';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from '@expo/vector-icons';

type AppIconProps = {
  type: 'ion' | 'material' | 'fa5' | 'ant';
  name: string;
  size?: number;
  color?: string;
};

const AppIcon = ({
  type,
  name,
  size = 22,
  color = '#333',
}: AppIconProps) => {
  switch (type) {
    case 'ion':
      return <Ionicons name={name as any} size={size} color={color} />;
    case 'material':
      return <MaterialIcons name={name as any} size={size} color={color} />;
    case 'fa5':
      return <FontAwesome5 name={name as any} size={size} color={color} />;
    case 'ant':
      return <AntDesign name={name as any} size={size} color={color} />;
    default:
      return null;
  }
};

export default AppIcon;
