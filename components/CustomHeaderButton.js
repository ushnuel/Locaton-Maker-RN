import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const customHeaderButton = (props) => {
  return <HeaderButton {...props} color='white' iconSize={23} IconComponent={Ionicons} />;
};

export default customHeaderButton;
