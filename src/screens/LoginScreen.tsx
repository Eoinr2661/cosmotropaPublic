import React from 'react';
import { View, ImageBackground, ImageSourcePropType } from 'react-native';
import { sovietFragmentStyles } from '../assets/sovietStyles';
import ScreenHeader from '../components/fragments/ScreenHeader';
import LoginBox from '../components/fragments/LoginBox';

/**
 * User's may log in via this screen
 * @returns 
 */
const LoginScreen = () => {

  return (
    <ImageBackground
      source={require('../assets/images/IndustryFarmScience.png') as ImageSourcePropType}
      style={sovietFragmentStyles.backgroundImage}
    >

      <View style={{flex:1}}>
        <ScreenHeader title='ACCOUNT' />
        <View>
          <LoginBox/>
        </View>

      </View>
    </ImageBackground>
  );
};

export default LoginScreen;