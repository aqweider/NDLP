import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { languageDetector } from './languageDetector';
import { resources } from './resources';

export const initI18n = () =>
  i18n.use(languageDetector).use(initReactI18next).init({
    compatibilityJSON: 'v3', // because Intl.PluralRules not supported in Hermes
    fallbackLng: 'en',
    defaultNS: 'common',
    resources,
  });
