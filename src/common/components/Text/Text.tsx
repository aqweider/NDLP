import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextProps, TextStyle } from 'react-native';
import Theme from 'react-native-theming';

import { TextSize } from '@/src/theme/const';

interface Props extends TextProps {
  bold?: boolean;
  extraBold?: boolean;
  children?: React.ReactNode;
  size?: number;
  light?: boolean;
  color?: string;
  center?: boolean;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  importantStyle?: TextStyle;
}

export const Text = ({
  bold,
  size,
  light,
  color,
  center,
  extraBold,
  mt,
  mr,
  mb,
  ml,
  style,
  importantStyle,
  ...restProps
}: Props) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const allStyles = [
    styles.default,
    isRtl ? styles.rtl : styles.ltr,
    bold && styles.bold,
    extraBold && styles.extraBold,
    light && styles.light,
    center && styles.center,
    style,
    !!color && { color },
    !!size && { fontSize: size },
    !!mt && { marginTop: mt },
    !!mr && { marginRight: mr },
    !!mb && { marginBottom: mb },
    !!ml && { marginLeft: ml },
    !!importantStyle && importantStyle,
  ];

  return <Theme.Text style={allStyles} {...restProps} />;
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'TheSansArabic-Bold',
  },
  center: {
    textAlign: 'center',
  },
  default: {
    fontFamily: 'TheSansArabic-Plain',
    fontSize: TextSize.Body,
  },
  extraBold: {
    fontFamily: 'TheSansArabic-ExtraBold',
  },
  light: {
    fontFamily: 'TheSansArabic-Plain',
  },
  ltr: {
    writingDirection: 'ltr',
  },
  rtl: {
    writingDirection: 'rtl',
  },
});
