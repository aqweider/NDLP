import React, {FC} from 'react';
import {
  Dimensions,
  I18nManager,
  ImageSourcePropType,
  StyleSheet,
  View,
  useWindowDimensions
} from 'react-native';
import RenderHtml from 'react-native-render-html';

import {Text, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';

export type Props = {
  id: number;
  title: string;
  imageSrc: ImageSourcePropType;
};
export const HighLightCard = ({item}: {item: Props}) => {
  return (
    <View style={styles.container}>
        <Image
          source={{uri: item.imageSrc}}
          style={styles.img}
          resizeMode="contain"
        />
      {/* <Text size={14} color={Color.White} style={styles.title}>
        {item?.description}
      </Text> */}
      <View style={{width: useWindowDimensions().width * 0.74}}>
      <RenderHtml
        source={{html:`<div style='color: #fff'>${item?.description}</div>`,}}
      />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.Jacarta,
    borderRadius: 14,
    marginHorizontal: 15,
    paddingBottom: 10,
    paddingEnd: 18,
    paddingStart: 22,
    paddingTop: 22,
    height: 450,
    width: Dimensions.get('screen').width * 0.84,
  },
  img: {
    height: '50%',
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 200,
    maxHeight: 200,
    backgroundColor: 'white'
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    fontFamily: I18nManager.isRTL ? 'TheSansArabic-Bold' : 'Inter-Medium',
    lineHeight: 16.94,
  },
});
