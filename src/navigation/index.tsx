import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import type { User } from '@react-native-firebase/auth';
import { ScreenNames } from '../constant/screenNames';
import { RootStackNavigation } from './types';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), currentUser => {
      setUser(currentUser);
      setIsInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (isInitializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen
            name={ScreenNames.LOGGED_IN_STACK}
            component={LoggedInStack}
          />
        ) : (
          <Stack.Screen
            name={ScreenNames.LOGGED_OUT_STACK}
            component={LoggedOutStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
