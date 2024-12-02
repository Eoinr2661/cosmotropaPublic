import React from 'react';
import { View, ImageBackground, ImageSourcePropType, Text  } from 'react-native';
import { sovietColours, sovietFragmentStyles } from '../assets/sovietStyles';
import ScreenHeader from '../components/fragments/ScreenHeader';
import { useAuthentication } from '../contexts/AuthenticationContext';

/**
 * This screen is where the user's account info is shown, acccount management is done via the website. 
 * @returns 
 */
const AccountScreen = () => {
  const { currentUser } = useAuthentication();

  // These are the variables I could use with the Auth from firebasem, keeping here because I'll likely use them in the future! 

  // console.log(user.photoURL);
  // console.log(user.phoneNumber);
  // console.log(user.displayName);
  // console.log(user.emailVerified);
  // console.log(user.isAnonymous);
  // console.log(user.uid);
  // console.log(user.email);


  return (
    <ImageBackground
      source={require('../assets/images/IndustryFarmScience.png') as ImageSourcePropType}
      style={sovietFragmentStyles.backgroundImage}
    >
      <View>
        <ScreenHeader title='ACCOUNT' />
        <View>
          <View style={{
            padding: 15,
            margin: 20,
            backgroundColor: sovietColours.sovietWhiteTranslucent,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ddd',
          }}>
            <Text style={{
              fontSize: 16,
              color: '#333',
            }}>
              You are currently logged in, to log out, press the button at the top right of the screen.
            </Text>
          </View>
          <View style={{
            padding: 15,
            margin: 20,
            backgroundColor: sovietColours.sovietWhiteTranslucent,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ddd',
          }}>
            <Text style={{
              fontSize: 16,
              color: '#333',
            }}> Your recorded flights will automatically be associated with your account. If you wish to manage your account, please do so via the Cosmotropa Website </Text>

          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AccountScreen;