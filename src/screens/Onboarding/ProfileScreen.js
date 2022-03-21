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
import { Global } from '@styles';
import { themeBackgroundColor, themeTextColor, themeIconColor } from "@utils";

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale;

// Avatar attributes
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
    <View style={[Global.container, theme === 'dark' ? Global.dark : Global.light]}>
      <ScrollView style={Global.scrollView}>
        <View style={Global.top}>

          <TouchableOpacity onPress={handleSelectAvatar} activeOpacity={1} style={Global.alignCenter}>
            {avatar === null ? (
              <View style={[Global.avatarBig, { backgroundColor: themeBackgroundColor(theme) }]}>
                <Icon name="add" size={44} style={{color: themeIconColor(theme) }} />
              </View>
            ) : (    
              <ImageBackground 
                style={Global.avatarBig} 
                imageStyle={{ borderRadius: 65}}
                source={{ uri: avatar.uri }} 
                resizeMode="cover" />
            )}

            <Text style={[Global.label, { color: themeTextColor(theme) }]}>{i18n.t('inputLabelAvatar')}</Text>
          </TouchableOpacity>

          <View style={[Global.inputWrapper, Global.marginTopLarge]}>
            <Text style={[Global.inputLabel, { color: themeTextColor(theme) }]}>{i18n.t('inputLabelName')}</Text>
            <TextInput
              placeholder={i18n.t('inputPlaceholderName')}
              placeholderTextColor={Colors.mediumGray}
              textContentType="name"
              maxLength={NAME_MAX_LENGTH}
              onChangeText={text => handleInputChange(text)}
              style={[Global.input, { color: themeTextColor(theme) }]} />
          </View>
        </View>
      </ScrollView>

      <View style={Global.bottom}>
        <Text style={[Global.small, Global.paddingVertical]}>
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

});