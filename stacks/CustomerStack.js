import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CustomerHomeScreen from "../screens/CustomerHomeScreen";
import CustomerCartScreen from "../screens/CustomerCartScreen";
import CustomerProfileScreen from "../screens/CustomerProfileScreen";

const CustomerStack = () => {
  const Tab = createBottomTabNavigator();
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = "home";
      switch (route.name) {
        case "Home":
          iconName = "home";
          break;

        case "Profile":
          iconName = "person";
          break;

        case "Cart":
          iconName = "cart";
          break;

        default:
          iconName = "home";
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? "#07b836" : "#acf2bf"}
        />
      );
    },
    tabBarStyle: [
      {
        display: "flex",
      },
      null,
    ],
    headerStyle: {
      backgroundColor: "#07b836",
    },
    headerTitleStyle: {
      color: "#FFFFFF",
    },
    headerTitleAlign: "center",
  });
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={CustomerHomeScreen} />
      <Tab.Screen name="Cart" component={CustomerCartScreen} />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
};

export default CustomerStack;
