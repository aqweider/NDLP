import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Color } from '@/src/theme/const';

export const Loader = ({
  transparent,
  cover,
}: {
  transparent?: boolean;
  cover?: boolean;
}) => (
  <View
    style={[
      styles.root,
      transparent && styles.transparentContainer,
      cover && styles.coverStyle,
    ]}>
    <ActivityIndicator size="large" color={Color.Primary} />
  </View>
);

const styles = StyleSheet.create({
  coverStyle: {
    backgroundColor: Color.DarkGunMetal,
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  root: {
    alignItems: 'center',
    backgroundColor: Color.DarkGunMetal,
    height: '100%',
    justifyContent: 'center',
  },
  transparentContainer: {
    alignItems: 'center',
    backgroundColor: Color.loaderBG,
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
});
