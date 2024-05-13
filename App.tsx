import auth from '@react-native-firebase/auth';
import React, {useCallback, useEffect, useState} from 'react';
import codePush from 'react-native-code-push';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import messaging from '@react-native-firebase/messaging';
import 'moment/locale/ar';
import 'moment/locale/fr';
import 'moment/locale/zh-cn';
import 'moment/locale/de';
import 'moment/locale/ja';
import 'moment/locale/ko';


import AuthContext from '@/src/app/auth/context';
import useGetOnboardingStatus from '@/src/app/hooks/useGetOnboardingStatus';
import OnBoardingStatusContext from '@/src/app/hooks/useOnBoardingStatus';
import {
  // NotificationListner,
  requestUserPermission,
} from '@/src/app/utils/pushNotifications_helper';
import AppNav from '@/src/navigation/AppNav';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
};
const queryClient = new QueryClient();

export const App = () => {
  const [initializing, setInitializing] = useState(true);

  const [user, setUser] = useState();
  const {isFirstLaunch, isLoading: onboardingIsLoading} =
    useGetOnboardingStatus();
  const [onBoardingStatus, setOnBoardingStatus] = useState(false);

  const authUser: any = React.useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );
  const isFirstLaunchStatus = React.useMemo(
    () => ({
      onBoardingStatus,
      setOnBoardingStatus,
    }),
    [onBoardingStatus],
  );
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('registerBackgroundHandler User pressed notification');
      const {title, body} = remoteMessage.notification ?? {};
    });
    requestUserPermission();
    // NotificationListner();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  useEffect(() => {
    if (!onboardingIsLoading) {
      setOnBoardingStatus(isFirstLaunch);
    }
  }, [isFirstLaunch, onboardingIsLoading]);

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    (userData: any) => {
      setUser(userData);
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authUser}>
        <OnBoardingStatusContext.Provider value={isFirstLaunchStatus}>
          <AppNav />
        </OnBoardingStatusContext.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default codePush(codePushOptions)(App);
// export default App;
