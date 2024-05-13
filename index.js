import { Alert, AppRegistry } from 'react-native';

import { disableFontScaling } from '@/src/app/utils/disableFontScaling';
import { initI18n } from '@/src/i18n/initI18n';
import Theme from '@/src/theme/Theme';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';

import App from './App';
  messaging().setBackgroundMessageHandler(async () => {
  });

initI18n();
Theme.init();
disableFontScaling();

AppRegistry.registerComponent('daleel', () => App);
