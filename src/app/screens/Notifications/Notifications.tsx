/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useEffect,useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Pressable, ScrollView, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {ScrollView as Scrollable} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import moment from 'moment';

import Close from '@/src/app/assets/icons/close-square.svg';
import {Images} from '@/src/app/assets/images';
import {
  Container,
  GradientView,
  Header,
  InvestorJourneyModal,
  Loader,
  Sheet,
  Text,
  View,
  Image,
} from '@/src/common/components';
import {Color, FontFamily} from '@/src/theme/const';
import {storage} from '@/src/storage';
const lang = storage.getString('language');
const dateLang = lang === 'zh-hant' ? 'zh-cn' : lang
import { getNotificationsApi } from '@/src/app/store/notification';

export default () => {
  const {t, i18n} = useTranslation();
  const { 
    notificatios,
    isLoading,
    error,
    handleNextPage,
    pageList
   } = getNotificationsApi();

  const navigation = useNavigation();

  const Notification = (item) => {
    console.log('item', item);
    
    return (
      <View
        style={{
          width: '100%',
          borderRadius: 15,
          marginBottom: 15,
          backgroundColor: '#463F5C',
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: '#281B41',
            // height: '100%',
            width: 70,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image
            source={Images.clock}
            style={{
              width: 27,
              height: 25,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontWeight: '300',
              FontFamily: 'Open Sans',
              fontSize: 13,
            }}>
           {/* {item?.time} */}
           {moment
          .utc(item?.time, 'HH:mm')
          .local()
          .format('HH:mm')}
          </Text>
          <Text
            style={{
              color: 'white',
              alignSelf: 'center',
              fontWeight: '300',
              FontFamily: 'Open Sans',
              fontSize: 11,
            }}>
           {/* {item?.date_time} */}
           {moment
          .utc(`${item?.date_time}`, 'DD/MM/YYYY HH:mm')
          .local()
          .format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={{ padding: 16, flex: 1}}>
          <Text style={{color: 'white',  fontSize: 16,}}>{item?.title}</Text>
          <Text style={{color: 'white',  fontSize: 14, marginTop: 5}}>{item?.content}</Text>
        </View>
      </View>
  );
  }

  const renderFooter = () => {
    if (isLoading) return <ActivityIndicator size="small" color={Color.Primary} />;
    return null;
  };

  useEffect(() => {
    if (pageList?.length > 0) {
      onEndReachedFunc();
    }
  }, [pageList]);

  const onEndReachedFunc = useCallback(() => {
    if (pageList?.length > 0) {
      handleNextPage()
    }
  }, [pageList]);

  return (
    <Container>
      <SafeAreaView style={{paddingHorizontal: 25, }}>
      {/* <View style={{paddingHorizontal: 25, marginBottom: 130}}> */}
        <View
          style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Close height={24} width={24} />
          </Pressable>
        </View>

        {/* <View
          style={{
            marginTop: 20,
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            color="white"
            style={{
              alignSelf: 'flex-start',
              marginBottom: 32,
            }}>
            {t('Notifications.today')}
          </Text>

          <Text style={{fontFamily: 'Open Sans'}} color="white">
            {t('Notifications.noNotifications')}
          </Text>
        </View> */}
        {notificatios.length === 0 && !isLoading && 
         <Text style={{fontFamily: 'Open Sans', alignSelf: 'center', marginTop: 30, fontSize: 20}} color="white">
         {t('Notifications.noNotifications')}
       </Text>
        }
        <View style={{height: '100%', paddingBottom: 100}}>
        <FlatList
          data={notificatios}
          renderItem={({item}) => Notification(item)}
          keyExtractor={item => item?.id.toString()}
          extraData={notificatios}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          onEndReached={onEndReachedFunc} 
          onEndReachedThreshold={0.30}
        />
        </View>
        {/* <Text
          style={{
            color: 'white',
            fontWeight: '300',
            FontFamily: 'Open Sans',
            fontSize: 13,
            marginBottom: 19,
          }}>
          Previous notifications
        </Text>
        {Notification()} */}
      </SafeAreaView>
      {/* </View> */}
    </Container>
  );
};
