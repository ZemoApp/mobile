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
import { Global } from '@styles';
import { 
  themeBackgroundColor, 
  themeTextColor, 
  themeStatusBarStyle,
  themeLinkColor,
} from "@utils";

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale;

export default () => {
  const theme = useColorScheme();

  return (
    <View style={[Global.container, theme === 'dark' ? Global.dark : Global.light]}>
        <View style={Global.inputWrapper}>
          <TextInput
            autoFocus={true} 
            multiline={true}
            numberOfLines={6}
            placeholderTextColor={Colors.mediumGray}
            placeholder={i18n.t('inputPlaceholderSeed')}
            style={[Global.input, { color: themeTextColor(theme) }]} />
        </View>

      <View style={Global.bottom}>
        <Button 
            label={i18n.t('buttonRestore')}
            onPress={handleStartPress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

});