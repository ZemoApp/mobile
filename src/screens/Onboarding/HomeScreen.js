import React, { useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  useColorScheme, 
  StatusBar 
} from "react-native";
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
 
  handleStartPress = () => {
    refRBSheet.current.open();
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
          <Button 
            label={i18n.t('buttonStart')} 
            onPress={handleStartPress} />
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

});
