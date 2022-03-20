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
    ToastAndroid
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, zh, hi, es, ru } from '@languages';
import { Colors } from '@constants';
import { Button } from '@components';

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
    <View key={key} style={[styles.wordContainer, { backgroundColor: theme === 'dark' ? Colors.darkGray : Colors.lightGray }]}>
      <Text style={[styles.word, {color: theme === 'dark' ? Colors.white : Colors.black}]}>{key+1}. {word}</Text>
    </View>
  );

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.top}>
                <Text style={[styles.helperText, {color: theme === 'dark' ? Colors.white : Colors.black}]}>{i18n.t('helperTextRecovery')}</Text>
                <View style={styles.seed}>{seedPhrase}</View>
                <TouchableOpacity onPress={handleCopyPress} activeOpacity={1}>
                    <Text style={[styles.copy, { color: theme === 'dark' ? Colors.yellow : Colors.blue }]}>{copyLabel}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>


      <View style={styles.bottom}>
        <Button 
            label={i18n.t('buttonContinue')} 
            onPress={handleRestorePress} />
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },

  scrollView: {
    width: '100%'
  },

  dark: {
    backgroundColor: Colors.dark,
  },

  light: {
    backgroundColor: Colors.white,
  },

  top: {
    alignItems: 'center',
    marginBottom: 100,
    paddingHorizontal: 20,
    width: '100%'
  },

  bottom: {
    alignItems: 'center',
    bottom: 24,
    paddingHorizontal: 20,
    position: 'absolute',
    width: '100%'
  },

  helperText: {
    fontSize: 17,
    width: '100%'
  },

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
      marginBottom: 8,
      marginRight: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
  },

  word: {
    fontSize: 17,
  }
});
