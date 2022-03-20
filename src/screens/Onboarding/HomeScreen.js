import React, { useRef, useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  Text,
  useColorScheme, 
  TouchableOpacity,
  StatusBar, 
  Linking,
} from "react-native";
import Checkbox from 'expo-checkbox';
import RBSheet from "react-native-raw-bottom-sheet";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, zh, hi, es, ru } from '@languages';
import { Colors } from '@constants';
import { ActionSheet, Button } from '@components';

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale; 
 
export default ({ navigation }) => {  
  const theme = useColorScheme();
  const refRBSheet = useRef();
  const [checked, setChecked] = useState(false);
 
  const handleAcceptPress = () => {
    setChecked(!checked);
  }

  handleStartPress = () => {
    // only show the action sheet if the terms checkbox is checked
    if (checked) {
      refRBSheet.current.open(); 
    }
  } 

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
        <StatusBar 
            barStyle={theme === 'dark' ? 'default' : 'dark-content'} 
            backgroundColor="transparent" translucent />

        <Image 
            source={require("@assets/images/zemo-icon.png")} 
            style={styles.icon} />

        <Image 
            source={theme === 'dark' ? require("@assets/images/zemo-logo-light.png") : require("@assets/images/zemo-logo-dark.png")} 
            style={styles.logo} />

        <View style={styles.bottom}>
            <TouchableOpacity onPress={handleAcceptPress} activeOpacity={1} style={styles.terms}>
              <Checkbox 
                value={checked} 
                onValueChange={setChecked} 
                color={Colors.mediumGray}
                style={styles.checkbox} />
              <Text 
                style={[styles.small, { color: theme === 'dark' ? Colors.white : Colors.black }]}>
                  {i18n.t('helperTextIAccept')}&nbsp;
              </Text> 
              <Text 
                style={{ color: theme === 'dark' ? Colors.yellow : Colors.blue }} 
                onPress={ ()=>{ Linking.openURL('https://zemo.app/terms')}}>
                  {i18n.t('helperTextTermsOfUse')}
              </Text>
            </TouchableOpacity>
            
          <Button 
            label={i18n.t('buttonStart')} 
            disabled={!checked}
            onPress={handleStartPress} />

          <Text 
            style={[styles.small, styles.privacy, { color: theme === 'dark' ? Colors.yellow : Colors.blue }]} 
            onPress={ ()=>{ Linking.openURL('https://zemo.app/privacy')}}>
              {i18n.t('helperTextPrivacyPolicy')}
          </Text>
        </View>

        <RBSheet 
          ref={refRBSheet} 
          closeOnDragDown={true} 
          height={148}
          customStyles={{
            container: {
              backgroundColor: theme === 'dark' ? Colors.dark : Colors.white
            }
          }}>
            <ActionSheet 
              id="onboarding_start" 
              navigation={navigation} 
              refRBSheet={refRBSheet} />
        </RBSheet>

    </View>
  ) 
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  bottom: {
    alignItems: 'center',
    bottom: 24,
    position: 'absolute',
    width: '100%'
  },

  icon: {
    height: 142,
    width: 142,
    resizeMode: 'contain'
  },

  logo: {
    height: 39,
    marginTop: 7,
    marginBottom: 110,
    width: 106,
    resizeMode: 'contain'
  },

  dark: {
    backgroundColor: Colors.dark,
  },

  light: {
    backgroundColor: Colors.white,
  },

  terms: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 16,
  },

  checkbox: {
    marginRight: 6,
  },  

  small: {
    color: Colors.mediumGray,
    fontSize: 14,
    textAlign: 'center',
  },

  privacy: {
    marginTop: 16,
  }

});
