import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
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
      <Tab.Screen
        name="Cart"
        options={{
          headerTitleAlign: "left",
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  height: 30,
                  borderRadius: 25,
                  backgroundColor: "black",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginRight: 20,
                  }}
                >
                  <Ionicons name="cart" size={20} color="yellow" />
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 10,
                    }}
                  >
                    2
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Ionicons name="wallet" size={20} color="yellow" />
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 10,
                    }}
                  >
                    Ksh. 23999
                  </Text>
                </View>
              </TouchableOpacity>
            );
          },
        }}
        component={CustomerCartScreen}
      />
      <Tab.Screen name="Profile" component={CustomerProfileScreen} />
    </Tab.Navigator>
  );
};

export default CustomerStack;
