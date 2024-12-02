import { View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { sovietColours, sovietFragmentStyles, sovietTextStyles } from "../../assets/sovietStyles";
import { WideButton } from "../buttons/WideButton";
import { useNavigation } from "@react-navigation/native";
import { LoginCreateAccountNavButton } from '../buttons/LoginCreateAccountNavButton';
import { useAuthentication } from '../../contexts/AuthenticationContext';
/**
 * This component contains all the necessary information and variables for creating an account via the mobile app. Firebase ensures a strong password, whilst also ensuring there is no duplicate emails
 * @returns 
 */
const CreateAccountBox = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [displayNameInput, setDisplayNameInput] = useState('');
  const { createAccount } = useAuthentication();
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    if (passwordInput !== confirmPasswordInput) {
      Alert.alert("Passwords do not match");
      return;
    }
    createAccount(emailInput.trim(), passwordInput, confirmPasswordInput, displayNameInput);
  };

  return (
    <View style={sovietFragmentStyles.accountManagementBox}>
      <TextInput
        placeholder='DISPLAY NAME'
        value={displayNameInput}
        onChangeText={setDisplayNameInput}
        style={sovietTextStyles.accountInputText}
        placeholderTextColor={sovietColours.sovietLightGreyTranslucent}
      />
      <TextInput
        placeholder='EMAIL'
        value={emailInput}
        onChangeText={setEmailInput}
        style={sovietTextStyles.accountInputText}
        placeholderTextColor={sovietColours.sovietLightGreyTranslucent}
      />
      <TextInput
        placeholder='PASSWORD'
        value={passwordInput}
        onChangeText={setPasswordInput}
        secureTextEntry
        style={sovietTextStyles.accountInputText}
        placeholderTextColor={sovietColours.sovietLightGreyTranslucent}
      />
      <TextInput
        placeholder='CONFIRM PASSWORD'
        value={confirmPasswordInput}
        onChangeText={setConfirmPasswordInput}
        secureTextEntry
        style={sovietTextStyles.accountInputText}
        placeholderTextColor={sovietColours.sovietLightGreyTranslucent}
      />
      <WideButton onPress={handleCreateAccount} title="CREATE ACCOUNT" />
      <LoginCreateAccountNavButton onPress={() => navigation.goBack()} title="ALREADY HAVE AN ACCOUNT?" />
    </View>
  );
};

export default CreateAccountBox;
