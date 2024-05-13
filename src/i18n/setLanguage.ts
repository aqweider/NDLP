import i18next from 'i18next';
import { I18nManager } from 'react-native';

import { storage } from '@/src/storage';

export const setLanguage = (language: string) => {
  const myArray = language.split("-");
  const isRTL = i18next.dir(language) === 'rtl';
  I18nManager.forceRTL(isRTL);
  I18nManager.allowRTL(isRTL);
  storage.set('language', language === 'zh-hant' ? language : myArray[0]);
};
