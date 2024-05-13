import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Color } from '@/src/theme/const';

type Props = {
  label: string;
  active?: boolean;
  onPress: (arg0: any) => any;
  id?: string;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const GradientButton = ({
  label,
  active = true,
  onPress,
  id,
  customStyle,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={
          active
            ? [Color.MediumPurple, Color.AmericanViolet]
            : [Color.Jacarta, Color.Jacarta]
        }
        style={[styles.linearGradient, customStyle]}>
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: Color.White,
    fontFamily: 'TheSansArabic-Plain',
    fontSize: 12,
    textAlign: 'center',
  },
  linearGradient: {
    borderRadius: 16,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
});
