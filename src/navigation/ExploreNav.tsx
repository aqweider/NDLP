import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Enablers } from '@/src/app/screens/EnablersScreens/Enablers';
import { Explore } from '@/src/app/screens/ExploreScreens/Explore';
import { Register } from '@/src/app/screens/RegisterScreen/Register';
import { Sectors } from '@/src/app/screens/SectorsScreens/Sectors';
import { Route } from '@/src/navigation/routes';
import Notifications from '../app/screens/Notifications/Notifications';

const Stack = createNativeStackNavigator();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ExploreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* explore Screens */}
      <Stack.Screen
        name={Route.EXPLORE}
        component={Explore}
        options={{ title: Route.EXPLORE }}
      />
      <Stack.Screen
        name={Route.SECTORS_PARENT}
        component={Sectors}
        options={{ title: Route.SECTORS_PARENT }}
      />
      <Stack.Screen
        name={Route.ENABLERS}
        component={Enablers}
        options={{ title: Route.ENABLERS }}
      />
      {/* <Stack.Screen
        name={Route.Notifications}
        component={Notifications}
        options={{ title: Route.Notifications }}
      /> */}
    </Stack.Navigator>
  );
};

export default ExploreStack;
