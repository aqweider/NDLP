import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Color } from '@/src/theme/const';

export type ContainerProps = {
  children: React.ReactNode;
};
export const Container: FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.DarkGunMetal,
    flex: 1,
    width: '100%',
  },
});
