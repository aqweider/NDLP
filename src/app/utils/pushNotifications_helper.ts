import messaging from '@react-native-firebase/messaging';
// import {useNavigation} from '@react-navigation/native';

import { storage } from '@/src/storage';
import { registerNotificationFcmToken } from '@/src/app/services/notification';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
const lang = storage.getString('language');
import {Route} from '@/src/navigation/routes';
// const navigation = useNavigation();

// export const requestUserPermission = async () => {
//   if (Platform.OS === 'android' && Platform.Version >= 23) {
//     const result = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.NOTIFICATION_LISTENER
//     );
//     return result === PermissionsAndroid.RESULTS.GRANTED;
//   }
//   // return true; // Already granted or not applicable

//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFCMToken();
//   }
// };

export const requestUserPermission = async () => {
  const permissionStatus = {
    ios: () =>
      messaging()
        .requestPermission()
        .then(
          res =>
            res === messaging.AuthorizationStatus.AUTHORIZED ||
            res === messaging.AuthorizationStatus.PROVISIONAL,
        ),
    android: () =>
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ).then(res => res === 'granted' || true),
  };

  const enabled = await permissionStatus[Platform.OS]();

  if (enabled) {
    return getFCMToken();
  }
};

const getFCMToken = async () => {  
  let fcmToken = storage.getString('fcmToken');
  messaging().onTokenRefresh(newFcmToken => {
   fcmToken = newFcmToken
   storage.set('fcmToken', newFcmToken);
  });
  
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    try {
      if (fcmToken) {
        storage.set('fcmToken', fcmToken);
        registerNotificationFcmToken(fcmToken);
      } else {
        console.log('error in fcmToken');
      }
    } catch (error) {
      console.log(error, 'error in fcmToken');
    }
  }else {
    registerNotificationFcmToken(fcmToken);
  }
  
};

export const NotificationListner = async (navigation: any) => {
  notifee.onBackgroundEvent(async ({type, detail}) => {    
    switch (type) {
      case EventType.PRESS:
        navigation.navigate(Route.Notifications as never);
        break;
      default:
        break;
    }
  });

  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.PRESS:
        const { notification } = detail;
        navigation.navigate(Route.Notifications as never);
        break;
      default:
        break;
    }
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    navigation.navigate(Route.Notifications as never);
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        navigation.navigate(Route.Notifications as never);
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    onDisplayNotification(remoteMessage);

    console.log('notification on foreground state ......', remoteMessage);
  });

  
};

const onDisplayNotification = async(remoteMessage:{}) => {
  await notifee.requestPermission({
    sound: true,
    announcement: true,
  });
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: remoteMessage?.notification?.title,
    body:  remoteMessage?.notification?.body,
    android: {
      channelId,
      smallIcon: 'ic_stat_name', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export const handleNotificationLanguage = () => {
  let langParam;
  switch (lang) {
    case 'en':
      langParam = 'english'
      break;
      case 'ar':
        langParam = 'arabic'
      break;
      case 'fr':
        langParam = 'french'
      break;
      case 'zh-hant':
        langParam = 'chinese'
      break;
      case 'de':
        langParam = 'german'
      break;
      case 'ja':
        langParam = 'japanese'
      break;
      case 'ko':
        langParam = 'korean'
      break;
    default:
      break;
  }
  return langParam;
};


