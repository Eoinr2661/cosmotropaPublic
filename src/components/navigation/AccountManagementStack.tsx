import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/LoginScreen";
import CreateAccountScreen from "../../screens/CreateAccountScreen";
import AccountScreen from "../../screens/AccountScreen";

const Stack = createStackNavigator();
/**
 * This is a funny implementation alongside the BottomTabNavigator.. 
 * So I have it set up to either render the Accountscreen or else this stack
 * But, I should probably update this to either render an account screen, where the components within that screen render conditionally depending on session status
 * Or I should have it so that this stack is just rendered. The current set up works perfectly and doesn't show any issues, but to simplify things for myself
 * I could consider swapping to just using this stack, or else render one screen with the components conditionally. 
 * @returns 
 */
const AccountManagementStack = () => (
  <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="CreateAccountScreen"
      component={CreateAccountScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AccountManagementStack;