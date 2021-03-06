import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    useColorScheme 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, zh, hi, es, ru } from '@languages';
import { Colors } from '@constants';
import { Global } from '@styles';
import { themeLabelColor } from "@utils";

// Localization
i18n.fallbacks = true;
i18n.translations = { en, zh, hi, es, ru };
i18n.locale = Localization.locale;

export default ({ id, navigation, refRBSheet }) => {
    const theme = useColorScheme();
    
    const handleOnboardingNew = () => {
        refRBSheet.current.close();
        // I put a small timeout here to avoid a UI glitch when the view change
        setTimeout(() => {
            navigation.push('OnboardingProfile')
        }, 250) 
    }

    const handleOnboardingRestore = () => {
        refRBSheet.current.close();   
        // I put a small timeout here to avoid a UI glitch when the view change
        setTimeout(() => {
            navigation.push('Restore');
        }, 250)
    }

    const handleOnboardingRecoveryConfirmPress = () => {
        alert('confirm');
    }

    return (
        <View style={styles.container}> 
            {id === 'onboarding_start' &&
                <View>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="add" size={28} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text style={themeLabelColor(theme)} onPress={handleOnboardingNew}>
                                {i18n.t('actionOptionNew')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="history" size={24} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text style={themeLabelColor(theme)} onPress={handleOnboardingRestore}>
                                {i18n.t('actionOptionRestore')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }

            {id === 'send_receive' &&
                <View>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="send" size={24} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text style={themeLabelColor(theme)}>
                                {i18n.t('actionOptionSend')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="qr-code" size={26} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text style={themeLabelColor(theme)}>
                                {i18n.t('actionOptionReceive')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
            
            {id === 'message_details' &&
                <View>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="launch" size={24} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text 
                                style={themeLabelColor(theme)}>
                                    {i18n.t('actionOptionViewOnBlockExplorer')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }

            {id === 'user_details' &&
                <View>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="block" size={24} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text 
                                style={themeLabelColor(theme)}>
                                    {i18n.t('actionOptionBlock')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1}>
                        <View style={styles.option}>
                            <Icon name="content-copy"  size={24} style={[styles.icon, { color: Colors.mediumGray }]} />
                            <Text 
                                style={themeLabelColor(theme)}>
                                    {i18n.t('actionOptionCopyAddress')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            }
        </View>
    ); 
}

const styles = {
    container: {
        flex: 1,
        width: '100%'
    },

    option: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 50,
        paddingLeft: 16,
        width: '100%'
    },

    icon: {
        width: 48,
    },

}