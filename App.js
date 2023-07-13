import { StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppStack from "./stacks/AppStack";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#07b836"
        barStyle="default"
        showHideTransition="slide"
      />
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
