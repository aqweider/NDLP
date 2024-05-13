/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import ArrowIconDark from '@/src/app/assets/icons/arrow-left-dark.svg';
import { Loader, View } from '@/src/common/components';

const IndustrialMap = ({ navigation }: any) => {
  const { i18n } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          i18n.language === 'ar' && { transform: [{ scaleX: -1 }] },
          {
            flexDirection: i18n.language == 'ar' ? 'row-reverse' : 'row',
            paddingHorizontal: 10,
          },
        ]}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowIconDark width={32} height={32} />
        </Pressable>
      </View>
      <WebView
        // ignohandler.proceed()reSslError={true}
        source={{
          uri:
            i18n.language !== 'ar'
              ? 'https://map.daleel.gov.sa/home'
              : 'https://map.daleel.gov.sa/ar/home',
        }}
        style={styles.webView}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        thirdPartyCookiesEnabled
        startInLoadingState={true}
        renderLoading={() => {
          return <Loader />;
        }}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  webView: {
    height: '100%',
    width: '100%',
  },
});
export default IndustrialMap;
