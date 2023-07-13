import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/AuthScreen";
import SignInScreen from "../screens/SignInScreen";
import CustomerSignUpScreen from "../screens/CustomerSignUpScreen";
import VendorSignUpScreen from "../screens/VendorSignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#07b836",
        },
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="SIGN IN"
        component={SignInScreen}
      />
      <Stack.Screen name="AUTH" component={AuthScreen} />
      <Stack.Screen name="CUSTOMER SIGN UP" component={CustomerSignUpScreen} />
      <Stack.Screen name="VENDOR SIGN UP" component={VendorSignUpScreen} />
      <Stack.Screen name="FORGOT PASSWORD" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
