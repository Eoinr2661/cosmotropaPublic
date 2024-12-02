import { TouchableOpacity } from "react-native";
import React, { FC, JSX } from "react";
import Icon from 'react-native-ionicons';
import {useAuthentication} from '../../contexts/AuthenticationContext';
import { useNavigation } from "@react-navigation/native";

/**
 * This is the icon found in the header, it allows users to log out and log in, because it is dealing with auth, I make use of the auth context and don't require props to be passed in
 * @returns 
 */
export const HeaderLogInOutButton: FC = () => {
  let loginLogoutIcon: JSX.Element;
  const { signOut, currentUser } = useAuthentication();
  const navigation = useNavigation<any>();
  if (currentUser) {
    loginLogoutIcon = <Icon name='log-out' onPress={signOut} size={30} />;
  } else {
    loginLogoutIcon = <Icon name='' onPress={() => navigation.navigate('LoginScreen')}  size={30} />; // got rid of this button for when not logged in, was causing minor errors need to be fixed
  }
  return (
    <TouchableOpacity style={{justifyContent:'center'}}>
      {loginLogoutIcon}
    </TouchableOpacity>
  );
};