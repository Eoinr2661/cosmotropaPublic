import { View, TextInput } from "react-native";
import React, { useState } from "react";
import { sovietColours, sovietFragmentStyles, sovietTextStyles } from "../../assets/sovietStyles";
import { useNavigation } from "@react-navigation/native";
import { WideButton } from "../buttons/WideButton";
import { LoginCreateAccountNavButton } from '../buttons/LoginCreateAccountNavButton'
import { useAuthentication } from "../../contexts/AuthenticationContext";
import { CustomNavigationProps } from "../../interfaces/InterfaceNavigationProps";

/**
 * This component is to allow the user to log in via the mobile application
 * @returns 
 */
const LoginBox = () => {
  
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const navigation = useNavigation<CustomNavigationProps>();

  const { loginWithEmailAndPassword } = useAuthentication();

  return (
    <View style={sovietFragmentStyles.accountManagementBox}>
      <TextInput placeholder='EMAIL' value={emailInput} onChangeText={setEmailInput} style={sovietTextStyles.accountInputText} placeholderTextColor={sovietColours.sovietLightGreyTranslucent}/>
      <TextInput placeholder='PASSWORD' value={passwordInput} onChangeText={setPasswordInput} secureTextEntry style={sovietTextStyles.accountInputText} placeholderTextColor={sovietColours.sovietLightGreyTranslucent}/>
      <WideButton onPress={() => loginWithEmailAndPassword(emailInput.trim(), passwordInput)} title="LOGIN"/>
      <LoginCreateAccountNavButton onPress={() => navigation.navigate("CreateAccountScreen")} title="MAKE AN ACCOUNT?" />
    </View>
  );
};

export default LoginBox;