import { LanguageDetectorModule } from 'i18next';

import { getPreferredLanguage } from './getPreferredLanguage';
import { setLanguage } from './setLanguage';

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: getPreferredLanguage,
  cacheUserLanguage: setLanguage,
};
