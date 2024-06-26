import { NativeModules, Platform } from 'react-native';

export const getDeviceLanguage = (): string => {
  const lang =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return lang.split('_')[0];
};
