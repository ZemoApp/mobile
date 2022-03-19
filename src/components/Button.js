import React from 'react';
import { Text, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { Colors } from '@constants';

export default ({ label, loading = false, onPress }) => {
    const theme = useColorScheme();

    return (
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={onPress} >
            {loading && 
                <ActivityIndicator />
            }
                
            {!loading && 
                <Text style={styles.buttonText}>{label}</Text>  
            }
        </TouchableOpacity>
    ); 
}

const styles = {
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