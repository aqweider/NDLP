import Intercom, { IntercomEvents } from '@intercom/intercom-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  AppState,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AskIcon from '@/src/app/assets/icons/ask.svg';
import AskActiveIcon from '@/src/app/assets/icons/askActive.svg';
import MapIcon from '@/src/app/assets/icons/indMap.svg';
import MapIconActive from '@/src/app/assets/icons/indMapActive.svg';
import AboutIcon from '@/src/app/assets/icons/info-circle.svg';
import AboutActiveIcon from '@/src/app/assets/icons/info-circle-active.svg';
import MarketInsightIcon from '@/src/app/assets/icons/MarketInsight.svg';
import MarketInsightActiveIcon from '@/src/app/assets/icons/MarketInsight-Active.svg';
import useKeyboard from '@/src/app/hooks/useKeyboard';
import { About } from '@/src/app/screens/AboutScreens/About';
import { Help } from '@/src/app/screens/HelpScreens/Help';
import IndustrialMap from '@/src/app/screens/IndustrialMap/IndustrialMap';
import { Route } from '@/src/navigation/routes';
import { storage } from '@/src/storage';
import { Color } from '@/src/theme/const';

import { Images } from '../app/assets/images';
import { MarketInsight } from '../app/screens/MarketInsights/MarketInsights';
import ExploreStack from './ExploreNav';

const AUTK_KEY = 'auth';

const Tab = createBottomTabNavigator();

const tabIcon = (focused: boolean, order: number, isKeyboardOpen?: boolean) => {
  switch (order) {
    case 0:
      return (
        <View style={styles.iconContainer}>
          {focused ? (
            <MarketInsightActiveIcon width={24} height={24} />
          ) : (
            <MarketInsightIcon width={24} height={24} />
          )}
        </View>
      );
      break;
    case 1:
      return (
        <View style={styles.iconContainer}>
          {focused ? (
            <MapIconActive width={24} height={24} />
          ) : (
            <MapIcon width={24} height={24} />
          )}
        </View>
      );
      break;
    case 2:
      return (
        <View
          style={[
            styles.helpIconContainer,
            isKeyboardOpen && { display: 'none' },
            focused && { opacity: 1 },
          ]}>
          <Image
            resizeMode="contain"
            source={Images.discover}
            style={styles.logo}
          />
        </View>
      );
      break;
    case 3:
      return (
        <View style={styles.iconContainer}>
          {focused ? (
            <AskActiveIcon width={24} height={24} />
          ) : (
            <AskIcon width={24} height={24} />
          )}
        </View>
      );
      break;
    case 4:
      return (
        <View style={styles.iconContainer}>
          {focused ? (
            <AboutActiveIcon width={24} height={24} />
          ) : (
            <AboutIcon width={24} height={24} />
          )}
        </View>
      );
      break;
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

const TabNav = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const isKeyboardOpen = useKeyboard();
  const [count, setCount] = useState<number>(0);
  const [loggedUser, setLoggedUser] = useState<boolean>(false);

  useEffect(() => {
    /**
     * Restore user login status
     */
    AsyncStorage.getItem(AUTK_KEY).then(it => {
      it === 'true' && setLoggedUser(true);
    });

    /**
     * Handle PushNotification
     */
    const appChangeListener = AppState.addEventListener(
      'change',
      nextAppState => nextAppState === 'active' && Intercom.handlePushMessage(),
    );

    /**
     * Handle Push Notification deep links
     */
    const urlListener = Linking.addEventListener('url', event => {
      if (event) {
        Alert.alert(event.url);
      }
    });

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          Alert.alert(url);
        }
      })
      .catch(error => console.log(error));

    /**
     * Handle message count changed
     */
    const countListener = Intercom.addEventListener(
      IntercomEvents.IntercomUnreadCountDidChange,
      response => {
        setCount(response.count as number);
      },
    );

    return () => {
      countListener.remove();
      urlListener.remove(); // <- for RN 0.65+
      appChangeListener.remove(); // <- for RN 0.65+
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={Route.EXPLORE_NAV_TAB}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: Color.White,
        tabBarInactiveTintColor: Color.Grey,
        tabBarStyle: {
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
          backgroundColor: Color.DarkPurple,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 94,
          zIndex: 8,
          borderTopWidth: 0,
          elevation: 4,
          shadowColor: Color.Black,
          shadowOffset: {
            width: 2,
            height: 1,
          },
          shadowOpacity: 0.13,
          shadowRadius: 2.62,
        },
        tabBarLabelStyle: styles.labelStyle,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: useCallback(
            ({ focused, color }) => {
              return (
                <Text style={[styles.labelStyle, { color }]}>
                  {t('marketInsight')}
                </Text>
              );
            },
            [t],
          ),
          tabBarIcon: ({ focused }) => {
            return tabIcon(focused, 0);
          },
        }}
        name={Route.MARKET_INSIGHTS}
        component={MarketInsight}
      />
      <Tab.Screen
        name="sectorsTab"
        component={() => null}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate(Route.INDUSTRIAL_MAP);
          },
        })}
        options={{
          tabBarLabel: useCallback(
            ({ focused, color }) => {
              return (
                <Text style={[styles.labelStyle, { color }]}>
                  {t('indMap')}
                </Text>
              );
            },
            [t],
          ),
          tabBarIcon: ({ focused }) => {
            return tabIcon(focused, 1);
          },
        }}
      />
      <Tab.Screen
        name={Route.EXPLORE_NAV_TAB}
        component={ExploreStack}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused }) => {
            return tabIcon(focused, 2, isKeyboardOpen);
          },
          tabBarItemStyle: {
            height: 20,
          },
        }}
      />

      <Tab.Screen
        name="aboutTab"
        component={About}
        options={{
          // tabBarLabel: t('about'),
          tabBarLabel: useCallback(
            ({ focused, color }) => {
              return (
                <Text style={[styles.labelStyle, { color }]}>
                  {t('about')}
                </Text>
              );
            },
            [t],
          ),
          tabBarIcon: ({ focused }) => {
            return tabIcon(focused, 4);
          },
        }}
      />
      <Tab.Screen
        name={Route.HELP}
        component={() => null}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault();
            Intercom.loginUnidentifiedUser().then(() => {
              setLoggedUser(true);
              AsyncStorage.setItem(AUTK_KEY, 'true');
            });
            Intercom.updateUser({
              languageOverride: storage.getString('language'),
            });
            Intercom.present();
          },
        })}
        options={{
          // tabBarLabel: t('askDaleel'),
          tabBarLabel: useCallback(
            ({ focused, color }) => {
              return (
                <Text style={[styles.labelStyle, { color }]}>
                  {t('askDaleel')}
                </Text>
              );
            },
            [t],
          ),
          tabBarIcon: ({ focused }) => {
            return tabIcon(focused, 3);
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
const styles = StyleSheet.create({
  helpIconContainer: {
    alignItems: 'center',
    backgroundColor: Color.ChinesePurple,
    borderRadius: 64,
    height: 64,
    justifyContent: 'center',
    opacity: 0.8,
    position: 'absolute',
    width: 64,
  },
  iconContainer: {
    position: 'absolute',
    top: 18,
  },
  labelStyle: {
    flexWrap: 'wrap',
    fontFamily: 'TheSansArabic-Plain',
    fontSize: 12,
    position: 'absolute',
    textAlign: 'center',
    top: 42,
    width: 66,
    alignSelf: 'center'
  },
  logo: {
    height: 25,
  },
});
