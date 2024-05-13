import React, { FC } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';

export const Icons = {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  Feather,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  Zocial,
};

interface IconProps {
  type: keyof typeof Icons;
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: Record<string, unknown>;
  focused?: boolean;
}

export const Icon: FC<IconProps> = ({ type, ...props }) => {
  const FontIcon = Icons[type];

  return <FontIcon {...props} />;
};
