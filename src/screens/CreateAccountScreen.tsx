import React from 'react';
import { View, ImageBackground, ImageSourcePropType, Alert } from 'react-native';
import { sovietFragmentStyles } from '../assets/sovietStyles';
import ScreenHeader from '../components/fragments/ScreenHeader';
import CreateAccountBox from '../components/fragments/CreateAccountBox';

/**
 * This screen is where the user may create their account, it renders the relevant CreateAccount Component and then the header. 
 * @returns 
 */
const CreateAccountScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/IndustryFarmScience.png') as ImageSourcePropType}
      style={sovietFragmentStyles.backgroundImage}
    >

      <View style={{flex:1}}>
        <ScreenHeader title='ACCOUNT' />
        <View>
          <CreateAccountBox/>
        </View>

      </View>
    </ImageBackground>
  );
};

export default CreateAccountScreen;