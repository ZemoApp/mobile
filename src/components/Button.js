import React from 'react';
import { 
    Text, 
    View,
    TouchableOpacity, 
    useColorScheme, 
    ActivityIndicator } 
from 'react-native';
import { Colors } from '@constants';

export default ({ label, loading = false, disabled = false, onPress }) => {
    const theme = useColorScheme(); 

    return (
        <TouchableOpacity style={[styles.container]} activeOpacity={1} onPress={onPress}>
            <View style={[styles.button, { opacity: disabled ? 0.25 : 1 }]}>
                {loading && 
                    <ActivityIndicator color={Colors.black} />
                }
                    
                {!loading && 
                    <Text style={styles.buttonText}>{label}</Text>  
                }
            </View>
        </TouchableOpacity>
    ); 
}

const styles = {
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    button: {
        alignItems: 'center',
        backgroundColor: Colors.yellow,
        borderRadius: 6,
        height: 46,
        justifyContent: 'center',
        width: '100%',
    },
    
    buttonText: {
        color: Colors.black,
        fontFamily: 'Helvetica Neue',
        fontSize: 16,
        fontWeight: 'bold',
    },
}