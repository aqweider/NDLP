import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

import { Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export const CommitmentsSection = (props) => {
  const {commitmentsData} = props;

  return (
    <View style={styles.container}>
      {commitmentsData && commitmentsData.map(item => {
        return (
          <View key={item.id.toString()} style={styles.cardContainer}>
            <SvgUri
              width={70}
              height={70}
              uri={item.imageSrc}
            />
            <Text
              mt={13}
              mb={50}
              light
              color={Color.White}
              size={13}
              style={styles.title}>
              {item.title}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    width: '45%',
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  img: { height: 70, width: 70 },
  title: { textAlign: 'center', width: '90%' },
});
