import React from 'react';
import { StyleSheet, Platform, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { OnboardingStack, FeedScreen } from '@screens';
import { navigationRef } from './RootNavigation';

const Stack = createStackNavigator();

const Transition = Platform.select({
  ios: TransitionPresets.DefaultTransition,
  android: TransitionPresets.DefaultTransition,
});

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{ 
      ...Transition, 
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Onboarding"
      component={OnboardingStack}
      options={{ 
        ...Transition, 
        headerShown: false, 
      }}
    />
    <Stack.Screen
      name="Feed"
      component={FeedScreen}
      options={{ 
        ...Transition,
        headerShown: false,  
      }}
    />
  </Stack.Navigator>
);

export default () => {
  const theme = useColorScheme();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme} ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  )
};
