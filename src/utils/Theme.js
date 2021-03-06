import { Colors } from '@constants';
import { Global } from '@styles';

export const themeStyle = (theme) => {
  return theme === 'dark' ? Global.dark : Global.light;
}

export const themeBackgroundColor = (theme) => {
  return theme === 'dark' ? Colors.darkGray : Colors.lightGray;
}

export const themeTextColor = (theme) => {
  return theme === 'dark' ? Colors.white : Colors.black;
}

export const themeIconColor = (theme) => {
  return theme === 'dark' ? Colors.yellow : Colors.darkGray;
}

export const themeStatusBarStyle = (theme) => {
  return theme === 'dark' ? 'default' : 'dark-content';
}

export const themeLinkColor = (theme) => {
  return theme === 'dark' ? Colors.yellow : Colors.blue;
}

export const themeLabelColor = (theme) => {
  return theme === 'dark' ? Global.labelDark : Global.labelLight;
}