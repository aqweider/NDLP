import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Color } from '@/src/theme/const';

export type Props = {
  children: React.ReactNode;
  style?: ViewStyle | [ViewStyle, any];
  colors?: [Color, Color];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};
export const GradientView: FC<Props> = ({
  children,
  style,
  colors,
  start,
  end,
}: Props) => {
  return (
    <LinearGradient
      start={start || { x: 1, y: 0 }}
      end={end || { x: 0, y: 0 }}
      colors={colors || [Color.MediumPurple, Color.AmericanViolet]}
      style={[styles.linearGradient, style]}>
      {children}
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
