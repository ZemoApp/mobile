import React from 'react';
import { Platform, StyleSheet, useColorScheme } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, zh, hi, es, ru } from '@languages';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import RecoveryScreen from './RecoveryScreen';
import RestoreScreen from './RestoreScreen';
import { Colors } from '@constants';

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale;

const transition = Platform.select({
  ios: TransitionPresets.DefaultTransition,
  android: TransitionPresets.DefaultTransition,
});

const Stack = createStackNavigator();

export default () => {
  const theme = useColorScheme();

  return (
    <Stack.Navigator
      screenOptions={{
          ...transition,
          headerTintColor: theme === 'dark' ? Colors.white : Colors.dark,
          headerStyle: {
            backgroundColor: theme === 'dark' ? Colors.dark : Colors.white,
            elevation: 0,
            shadowOpacity: 0
          },
        }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="OnboardingProfile" 
        component={ProfileScreen} 
        options={({ navigation }) => ({
          headerShown: true, 
          title: i18n.t('viewTitleOnboardingNew'),
        })} 
      />
      <Stack.Screen 
        name="OnboardingRecovery" 
        component={RecoveryScreen} 
        options={{ 
          headerShown: true, 
          headerLeft: ()=> null,
          title: i18n.t('viewTitleOnboardingRecovery') 
        }} 
      />
      <Stack.Screen 
        name="Restore" 
        component={RestoreScreen}
        options={({ navigation }) => ({
          headerShown: true, 
          title: i18n.t('viewTitleOnboardingRestore'),
        })} 
      />
    </Stack.Navigator>
  )
};

const styles = StyleSheet.create({

});
