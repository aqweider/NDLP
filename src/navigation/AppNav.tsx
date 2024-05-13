import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { MarketInsightField } from '@/src/app/screens/MarketInsights/MarketInsightField';
import { SectorField } from '@/src/app/screens/SectorsScreens/SectorField';
import IndustrialMap from '@/src/app/screens/IndustrialMap/IndustrialMap';
import { Route } from '@/src/navigation/routes';
import TabNav from '@/src/navigation/TabNav';
import { Register } from '@/src/app/screens/RegisterScreen/Register';
import Notifications from '../app/screens/Notifications/Notifications';


const Stack = createNativeStackNavigator();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const AppNav = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={Route.TAB_NAV}
            component={TabNav}
            options={{ headerShown: false }}
          />
          {/* explore Screens */}
          <Stack.Screen
            name={Route.SECTORS}
            component={SectorField}
            options={{ title: 'Sectors' }}
          />
          <Stack.Screen
            name={Route.MARKET_INSIGHTS_FIELD}
            component={MarketInsightField}
            options={{ title: Route.MARKET_INSIGHTS_FIELD }}
          />
          <Stack.Screen
            name={Route.INDUSTRIAL_MAP}
            component={IndustrialMap}
            options={{ title: 'map' }}
          />
          <Stack.Screen
            name={Route.REGISTER}
            component={Register}
            options={{ title: Route.REGISTER }}
          />
           <Stack.Screen
            name={Route.Notifications}
            component={Notifications}
            options={{ title: Route.Notifications }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppNav;
