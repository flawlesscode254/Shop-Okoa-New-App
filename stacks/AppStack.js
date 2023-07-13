import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/AuthScreen";
import SignInScreen from "../screens/SignInScreen";

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AppStack" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
