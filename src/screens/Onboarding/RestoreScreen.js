import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  useColorScheme
} from "react-native";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, zh, hi, es, ru } from '@languages';
import { Colors } from '@constants';
import { Button } from '@components';

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale;

export default () => {
  const theme = useColorScheme();

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
        <View style={styles.inputWrapper}>
          <TextInput
            autoFocus={true}
            placeholderTextColor={Colors.mediumGray}
            placeholder={i18n.t('inputPlaceholderSeed')}
            style={[styles.input, { color: theme === 'dark' ? Colors.white : Colors.black }]} />
        </View>

      <View style={styles.bottom}>
        <Button 
            label={i18n.t('buttonRestore')}
            onPress={handleStartPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },

  bottom: {
    alignItems: 'center',
    bottom: 20,
    position: 'absolute',
    width: '100%'
  },

  dark: {
    backgroundColor: Colors.dark,
  },

  light: {
    backgroundColor: Colors.white,
  },

  inputWrapper: {
    width: '100%'
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    fontSize: 18,
    width: '100%'
  },
});
