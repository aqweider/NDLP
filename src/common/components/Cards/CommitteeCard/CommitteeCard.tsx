import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import {Text, View, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type CardProps = {
  item: any;
  customStyle?: ViewStyle;
};
export const CommiteeCard: FC<CardProps> = ({item, customStyle}: CardProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item?.imageSrc}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text bold color={Color.White} size={13} style={styles.name}>
          {item?.name}
        </Text>
        <Text color={Color.White} size={11} style={styles.brief} mt={3}>
          {item?.role}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  brief: {
    textAlign: 'center',
  },
  container: {
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    elevation: 5,
    marginBottom: 30,
    marginRight: '4%',
    marginTop: 50,
    shadowColor: Color.Black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
    width: '45%',
  },
  image: {
    height: 114,
    width: 100,
    zIndex: 10,
  },
  imageContainer: {
    alignItems: 'center',
    height: 120,
    marginTop: -40,
  },
  name: {
    lineHeight: 20,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
