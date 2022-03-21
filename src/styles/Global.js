import { StyleSheet } from 'react-native';
import { Colors } from '@constants';

export default StyleSheet.create({
    // SECTIONS 
    container: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 0,
    },

    scrollView: {
      width: '100%'
    },

    top: {
      alignItems: 'center',
      marginBottom: 100,
      width: '100%'
    },

    bottom: {
      alignItems: 'center',
      bottom: 24,
      position: 'absolute',
      width: '100%'
    },

    small: {
      color: Colors.mediumGray,
      fontSize: 14,
      textAlign: 'center',
    },

    medium: {
      color: Colors.mediumGray,
      fontSize: 16,
      textAlign: 'center',
    },

    // TEXT
    helperText: {
      fontSize: 17,
      width: '100%'
    },

    // AVATARS
    avatarBig: {
      alignItems: "center",
      backgroundColor: Colors.darkGray,
      borderRadius: 65,
      height: 130,
      justifyContent: "center",
      marginBottom: 10,
      width: 130,
    },

    // POSITION
    alignCenter: {
      alignItems: 'center'
    },

    justifyCenter: {
      justifyContent: 'center',
    },

    // MARGIN
    marginTopLarge: {
      marginTop: 30,
    },

    // PADDING 
    paddingVertical: {
      paddingVertical: 16,
    },

    paddingHorizontal: {
      paddingHorizontal: 16,
    },

    paddingBottom: {
      paddingBottom: 16,
    },

    paddingTop: {
      paddingTop: 16,
    },

    // THEMES
    dark: {
      backgroundColor: Colors.dark,
    },
    
    light: {
      backgroundColor: Colors.white,
    },

    labelDark: {
      color: Colors.white,
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 50,
      width: '100%'
    },

    labelLight: {
      color: Colors.black,
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 50,
      width: '100%'
    },

    // INPUTS
    inputWrapper: {
      width: '100%'
    },

    inputLabel: {
      fontSize: 16,
      fontWeight: 'bold',
    },

    input: {
      fontSize: 18,
      textAlignVertical: 'top',
      width: '100%',
    },

    label: {
      fontSize: 16,
      fontWeight: 'bold',
    },

    checkbox: {
      marginRight: 6,
    },  
});