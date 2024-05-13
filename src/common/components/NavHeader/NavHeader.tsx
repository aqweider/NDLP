import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React from 'react';

import { Header } from '@/src/common/components';

export const NavStackHeader: React.FC<NativeStackHeaderProps> = ({
  navigation,
  options,
}: NativeStackHeaderProps) => {
  return (
    <Header
      goBack={true}
      onBackPress={() => navigation.goBack()}
      title={options.title}
    />
  );
};
export const NavTabHeader: React.FC<BottomTabHeaderProps> = ({
  options,
}: BottomTabHeaderProps) => {
  return <Header goBack={false} title={options.title} />;
};
