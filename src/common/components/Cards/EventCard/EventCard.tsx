import React from 'react';
import {
  Dimensions,
  I18nManager,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/zh-cn';

import LocationIcon from '@/src/app/assets/icons/Location.svg';
import {GradientView, Text, Image} from '@/src/common/components';
import {Color} from '@/src/theme/const';
import {storage} from '@/src/storage';
const lang = storage.getString('language');
const dateLang = lang === 'zh-hant' ? 'zh-cn' : lang

export type Props = {
  id: number;
  title: string;
  day: string;
  date: string;
  address: string;
  imageSrc: ImageSourcePropType;
};
export const EventCard = ({item}: {item: Props}) => {
  const {title, day, date, address, imageSrc} = item;
  const dateNumber = moment(date);
  const monthInChars = dateNumber.format('MMM');
  const formatDate = moment(date).format('DD/MM/YYYY');
  
  return (
    <View style={styles.container}>
      <Image source={{uri: imageSrc}} style={styles.img} resizeMode="contain" />
      <View style={styles.innerContainer}>
        <View style={styles.description}>
          <Text size={14} mb={15} color={Color.White} style={styles.title}>
            {title}
          </Text>
          <View style={styles.adressContainer}>
            {!!address && 
            <LocationIcon />
            }
            <Text
              size={12}
              color={Color.White}
              style={[styles.adress, styles.interFont]}>
              {address}
            </Text>
          </View>
        </View>
        <GradientView style={styles.dateContainer}>
          <Text
            size={17.5}
            color={Color.White}
            style={[styles.day, styles.interFont]}>
            {day}
          </Text>
          {!!dateLang && 
          <Text
            size={10}
            color={Color.White}
            style={[styles.date, styles.interFont]}>
            {moment.unix(date).locale(dateLang).format('MMM')} {'\n'}
            {moment.unix(date).locale(dateLang).format('YYYY')}
          </Text>
          }
        </GradientView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  adress: {
    marginStart: 9,
  },
  adressContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: Color.Jacarta,
    borderRadius: 14,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingEnd: 15,
    paddingStart: 16,
    paddingVertical: 20,
    width: Dimensions.get('screen').width * 0.78,
  },
  date: {textAlign: 'center'},
  dateContainer: {
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    paddingVertical: 6,
    width: '20%',
  },
  day: {
    textAlign: 'center',
  },
  description: {
    width: '70%',
  },
  img: {
    height: 81,
    marginBottom: 10,
    width: 100,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  interFont: {
    fontFamily: I18nManager.isRTL ? 'TheSansArabic-Bold' : 'Inter-Medium',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
