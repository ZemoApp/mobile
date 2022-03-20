import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Alert, 
  ScrollView,
  ImageBackground, 
  TouchableOpacity, 
  useColorScheme 
} from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, zh, hi, es, ru } from '@languages';
import { Colors } from '@constants';
import { Button } from '@components';

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale;

const NAME_MAX_LENGTH = 30;
const AVATAR_MAX_HEIGHT = 400;
const AVATAR_MAX_WIDTH = 400;
const AVATAR_QUALITY = 0.85;

export default ({ navigation }) => {
  const theme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(i18n.t('buttonSkip'));
  const [avatar, setAvatar] = useState(null);
  const [avatarHash, setAvatarHash] = useState(null);
  const [name, setName] = useState(null);

  const handleSelectAvatar = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo', 
      maxHeight: AVATAR_MAX_HEIGHT,  
      maxWidth: AVATAR_MAX_WIDTH,
      quality: AVATAR_QUALITY,
    }
    const result = await launchImageLibrary(options);

    if (!result.didCancel && !result.error) { 
      let asset = result.assets[0];
      if (asset.type === 'image/jpeg' || asset.type === 'image/png') {
        setAvatar(asset);
        setButtonLabel(i18n.t('buttonSave'));
      } else {
        Alert.alert(i18n.t('dialogTitleError'), i18n.t('dialogBodyIncorrectImageType'))
      }
    } else if (result.error) {
      Alert.alert('Error', response.error);
    } else if (result.didCancel) { 
      // user cancelled the request
    } else {
      Alert.alert(i18n.t('dialogTitleError'), i18n.t('dialogBodyPleaseTryAgain'));
    }
  }

  const handleInputChange = (text) => {
    if (text.length >= NAME_MAX_LENGTH){
      Alert.alert(i18n.t('dialogTitleNotice'), i18n.t('dialogBodyNameLimitReached'));
    }
    setName(text);
    setButtonLabel(text !== '' || avatar !== null ? i18n.t('buttonSave') : i18n.t('buttonSkip'));
  }

  const handleSavePress = async () => {
    if (loading) {
      return;
    } 

    setLoading(true);
    
    // if an avatar was selected upload it to IPFS
    if (avatar !== null) {
      const formData = new FormData();
      formData.append('avatar', avatar);

      // // call the create post API
      await fetch(`https://zemo.app/api/avatar`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => { return response.json() })
      .then(responseData => {
          if (responseData.message['IpfsHash']){ 
            setAvatarHash(responseData.message['IpfsHash']);
          } else {
            Alert.alert(i18n.t('dialogTitleNotice'), i18n.t('dialogBodyPleaseTryAgain'));   
            setLoading(false);   
            return;  
          }
      }).catch(error => { 
          Alert.alert(i18n.t('dialogTitleNotice'), i18n.t('dialogBodyPleaseTryAgain'));     
          setLoading(false);   
          return;
      })
    }

    // the user is skipping filling out their profile, send them to the next view
    if (avatar === null && name === null) {
      navigation.reset({ index: 0, routes: [{ name: 'OnboardingRecovery' }] });
      setLoading(false);   
      return;
    }

    // the user filled out their profile, save their data to localStorage
    if (avatar !== null || name !== null) {
      navigation.reset({ index: 0, routes: [{ name: 'OnboardingRecovery' }] });
      setLoading(false);   
      return;
    }
  }

  return (
    <View style={[styles.container, theme === 'dark' ? styles.dark : styles.light]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.top}>

          <TouchableOpacity onPress={handleSelectAvatar} activeOpacity={1} style={{alignItems: 'center'}}>
            {avatar === null ? (
              <View style={[styles.avatar, { backgroundColor: theme === 'dark' ? Colors.darkGray : Colors.lightGray }]}>
                <Icon name="add" size={44} style={{color: theme === 'dark' ? Colors.yellow : Colors.darkGray}} />
              </View>
            ) : ( 
              <ImageBackground 
                style={styles.avatar} 
                imageStyle={{ borderRadius: 65}}
                source={{ uri: avatar.uri }} 
                resizeMode="cover" />
            )}

            <Text style={[styles.label, { color: theme === 'dark' ? Colors.white : Colors.black }]}>{i18n.t('inputLabelAvatar')}</Text>
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <Text style={[styles.inputLabel, { color: theme === 'dark' ? Colors.white : Colors.black }]}>{i18n.t('inputLabelName')}</Text>
            <TextInput
              placeholder={i18n.t('inputPlaceholderName')}
              placeholderTextColor={Colors.mediumGray}
              textContentType="name"
              maxLength={NAME_MAX_LENGTH}
              onChangeText={text => handleInputChange(text)}
              style={[styles.input, { color: theme === 'dark' ? Colors.white : Colors.black }]} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <Text style={styles.small}>
          {i18n.t('helperTextOnboardingData')}
        </Text>

        <Button 
            label={buttonLabel} 
            loading={loading}
            onPress={handleSavePress} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },

  scrollView: {
    width: '100%'
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

  dark: {
    backgroundColor: Colors.dark,
  },

  light: {
    backgroundColor: Colors.white,
  },

  avatar: {
    alignItems: "center",
    backgroundColor: Colors.darkGray,
    borderRadius: 65,
    height: 130,
    justifyContent: "center",
    marginBottom: 10,
    width: 130,
  },

  inputWrapper: {
    marginTop: 30,
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

  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  small: {
    color: Colors.mediumGray,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  }
});