import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  I18nManager,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {Images} from '@/src/app/assets/images';
import {Color} from '@/src/theme/const';

import {Text} from '../Text';
import {Image} from '../Image';
export const Banner = props => {
  const {data} = props;
  const {t, i18n} = useTranslation();
  const {width} = Dimensions.get('screen');
  const bannerContent = [
    {
      id: 0,
      title: t('KingSalmanWord'),
      desc: t('TheCustodian'),
      imageSrc: Images.banner,
    },
    {
      id: 1,
      title: t('PrinceMohammadWord'),
      desc: t('RoyalHighness'),
      imageSrc: Images.banner2,
    },
  ];

  return (
    <View>
      {data &&
        data?.content.map(item => {
          return (
            <>
              <Image
                source={{uri: item.image}}
                style={styles.img}
                resizeMode="contain"
              />
              <Text
                size={50}
                color={Color.White}
                style={[
                  {
                    alignSelf: 'flex-start',
                  },
                  i18n.language === 'ar'
                    ? {transform: [{scaleY: -1}]} : {transform: [{scaleY: -1}, {scaleX: -1}]}
                    ,
                ]}>
                {t('openQuote')}
              </Text>
              <Text size={16} bold color={Color.White} style={styles.title}>
                {item.quote}
                <View>
                  <Text
                    size={50}
                    bold
                    color={Color.White}
                    style={[
                      styles.closedQuote,
                      i18n.language === 'ar' && {transform: [{scaleX: -1}]},
                    ]}>
                    {t('openQuote')}
                  </Text>
                </View>
              </Text>
              <Text bold size={12} mt={12} mb={21} color={Color.White}>
                {item.position}
              </Text>
            </>
          );
        })}
    </View>
  );
};
const styles = StyleSheet.create({
  closedQuote: {
    alignSelf: 'flex-end',
    left: I18nManager.isRTL ? -30 : 5,
    position: 'absolute',
    top: -25,
    ...(Platform.OS === 'ios' && {left: 5}),
  },
  img: {
    alignSelf: 'center',
    height: 200,
    marginBottom: 25,
    marginTop: 30,
    width: '80%',
  },
  title: {lineHeight: 21, textAlignVertical: 'center'},
});
