import { resources } from '@/src/i18n/resources';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    // defaultNS: 'common';
    resources: typeof resources['en'];
  }
}
