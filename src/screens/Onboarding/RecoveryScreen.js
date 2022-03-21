import React, { useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity,
    useColorScheme, 
    Alert,
    Platform,
    StatusBar,
    ToastAndroid
} from "react-native";
import * as Clipboard from 'expo-clipboard';
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

const TEMP_SEED_PHRASE = ['floor', 'window', 'round', 'paper', 'continue', 'yard', 'forecast', 'angry', 'previous', 'nail', 'flood', 'restore', 'volume', 'rain', 'final', 'fork', 'wind', 'realize', 'forward', 'length', 'floor', 'window', 'round', 'paper'];

export default ({ navigation }) => {
  const theme = useColorScheme();
  const [copyLabel, setCopyLabel] = useState(i18n.t('buttonCopyToClipboard'));

  const handleRestorePress = () => {
    Alert.alert(
        i18n.t('dialogTitleConfirm'),
        i18n.t('helperTextRecoveryConfirm'),
        [{
            text: i18n.t('buttonCancel'),
        },{
            text: i18n.t('buttonConfirm'),
            onPress: console.log('ok')
        }]
    );
  }

  const handleCopyPress = () => {
    Clipboard.setString(TEMP_SEED_PHRASE.join(' ')); 

    if (Platform.OS === 'android') {
        ToastAndroid.show(i18n.t('statusMessageCopied'), ToastAndroid.SHORT);
    } else {
        setCopyLabel(i18n.t('statusMessageCopied'));
    }
  }
 
  const seedPhrase = TEMP_SEED_PHRASE.map((word, key) =>
    <View key={key} style={[styles.wordContainer, { backgroundColor: themeBackgroundColor(theme) }]}>
      <Text 
        style={[styles.word, {color: themeTextColor(theme) }]}>
          <Text style={Global.small}>{key+1}.&nbsp;</Text>
          {word}
      </Text>
    </View>
  ); 

  return (
    <View style={[Global.container, theme === 'dark' ? Global.dark : Global.light]}>
        <StatusBar 
            barStyle={themeStatusBarStyle(theme)} 
            backgroundColor="transparent" translucent />

        <ScrollView style={Global.scrollView}>
            <View style={Global.top}>
                <Text 
                  style={[Global.helperText, { color: themeTextColor(theme) }]}>
                    {i18n.t('helperTextRecovery')}
                </Text>
                <View style={styles.seed}>{seedPhrase}</View>
                <TouchableOpacity onPress={handleCopyPress} activeOpacity={1}>
                    <Text style={[styles.copy, { color: themeLinkColor(theme) }]}>{copyLabel}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>


      <View style={Global.bottom}>
        <Button 
            label={i18n.t('buttonContinue')} 
            onPress={handleRestorePress} />
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  seed: {
    justifyContent: "center",
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },

  copy: {
      fontSize: 17,
      marginTop: 8,
  },

  wordContainer: {
      borderRadius: 8,
      marginBottom: 10,
      marginRight: 10,
      paddingHorizontal: 12,
      paddingVertical: 10,
  },

  word: {
    fontSize: 17,
  }
});
