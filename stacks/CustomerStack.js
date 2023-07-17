import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import db, { auth } from "../Firebase";

import CustomerHomeScreen from "../screens/CustomerHomeScreen";
import CustomerCartScreen from "../screens/CustomerCartScreen";
import CustomerProfileScreen from "../screens/CustomerProfileScreen";

const CustomerStack = () => {
  const [cartItems, setCartItems] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    db.collection(`cart${auth?.currentUser?.email}`).onSnapshot((snapshot) => {
      let info = snapshot.docs.map((doc) => ({
        id: doc.id,
        quantity: Number(doc?.data()?.quantity),
        amount: Number(doc?.data()?.price),
      }));
      if (info.length === 1) {
        setCartItems(info[0].quantity);
        setCartAmount(info[0].amount);
      } else if (info.length > 1) {
        let totalCount = 0;
        for (let item of info) {
          totalCount += item.quantity;
        }
        setCartItems(totalCount);

        let totalAmount = 0;
        for (let item of info) {
          totalAmount += item.amount * item.quantity;
        }
        setCartAmount(totalAmount);
      }
    });
  }, []);

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
              <TouchableOpacity style={styles.cartBar}>
                <View style={styles.countSection}>
                  <Ionicons name="cart" size={20} color="yellow" />
                  <Text style={styles.infoText}>{cartItems}</Text>
                </View>
                <View style={styles.amountSection}>
                  <Ionicons name="wallet" size={20} color="yellow" />
                  <Text style={styles.infoText}>Ksh. {cartAmount}</Text>
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

const styles = StyleSheet.create({
  cartBar: {
    paddingHorizontal: 15,
    height: 30,
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  countSection: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
  },
  infoText: {
    color: "white",
    marginLeft: 10,
  },
  amountSection: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
