import { changeLanguage } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';

import ArrowIcon from '@/src/app/assets/icons/arrow-right.svg';
import { Text, View } from '@/src/common/components';
import { Color } from '@/src/theme/const';

export const LanguageModal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (newLang: string) => {
    // changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    changeLanguage(newLang);
    SplashScreen.show();

    setTimeout(() => {
      RNRestart.restart();
    }, 300);
  };
  const languages = [
    {id: 1, name: "English", lang: 'en'},
    {id: 2, name: "العربيّة", lang: 'ar'},
    {id: 3, name: "FR", lang: 'fr'},
    {id: 4, name: "中文", lang: 'zh-hant'},
    {id: 5, name: "De", lang: 'de'},
    {id: 6, name: "日本語", lang: 'ja'},
    {id: 7, name: "한국어", lang: 'ko'}
  ]
  return (
    <View style={styles.languageContainer}>
      <Text size={28} mt={24} mb={24} bold color={Color.White}>
        {t('selectLanguage')}
      </Text>
      {languages.map((item, index) => {
        if (item.lang !== i18n.language) {
          return(
            <Pressable style={styles.languageButton} onPress={() => handleChangeLanguage(item.lang)}>
            <Text color={Color.White} size={17} light>
              {/* {t('language')} */}
              {item.name}
            </Text>
            <View
              style={[
                styles.arrow,
                i18n.language === 'ar' && { transform: [{ scaleX: -1 }] },
              ]}>
              <ArrowIcon width={16} height={16} />
            </View>
          </Pressable>
          );
        }
      })}
      {/* <Pressable style={styles.languageButton} onPress={() => handleChangeLanguage('ar')}>
        <Text color={Color.White} size={17} light>
          {t('language')}
        </Text>
        <View
          style={[
            styles.arrow,
            i18n.language === 'ar' && { transform: [{ scaleX: -1 }] },
          ]}>
          <ArrowIcon width={16} height={16} />
        </View>
      </Pressable>
      <Pressable style={styles.languageButton} onPress={() => handleChangeLanguage('fr')}>
        <Text color={Color.White} size={17} light>
          {t('frenchLanguage')}
        </Text>
        <View
          style={[
            styles.arrow,
            i18n.language === 'ar' && { transform: [{ scaleX: -1 }] },
          ]}>
          <ArrowIcon width={16} height={16} />
        </View>
      </Pressable> */}
    </View>
  );
};
const styles = StyleSheet.create({
  arrow: {
    justifyContent: 'center',
  },
  languageButton: {
    alignItems: 'center',
    backgroundColor: Color.Jacarta,
    borderRadius: 16,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    shadowColor: Color.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.21,
    marginBottom: 20,
  },
  languageContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
