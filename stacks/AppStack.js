import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import db, { auth } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AuthStack from "./AuthStack";
import CustomerStack from "./CustomerStack";
import LoaderScreen from "../screens/LoaderScreen";

import ShopsScreen from "../screens/ShopsScreen";
import ProductsScreen from "../screens/ProductsScreen";
import CustomerCartScreen from "../screens/CustomerCartScreen";
import SaccosScreen from "../screens/SaccosScreen";

const AppStack = () => {
  const [user, setUser] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    auth.onAuthStateChanged(async (current) => {
      db.collection("users")
        .doc(current?.uid)
        .get()
        .then((info) => {
          if (info?.exists) {
            setUser(info?.data());
          } else {
            setUser(null);
          }
          db.collection(`cart${auth?.currentUser?.email}`).onSnapshot(
            (snapshot) => {
              setCartCount(snapshot.docs.length);
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
            }
          );
        });
    });
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#07b836",
        },
      }}
    >
      {user === null ? (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      ) : !!user && user?.email ? (
        <Stack.Screen name="CustomerStack" component={CustomerStack} />
      ) : (
        <Stack.Screen name="Loader" component={LoaderScreen} />
      )}
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Shops"
        component={ShopsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerRight: () => {
            return (
              <View style={styles.cartInfo}>
                <Text style={styles.countText}>{cartCount}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Cart");
                  }}
                >
                  <Ionicons
                    name="arrow-forward-circle"
                    size={25}
                    color="yellow"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
        name="Products"
        component={ProductsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
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
        name="Cart"
        component={CustomerCartScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Savings"
        component={SaccosScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

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
  cartInfo: {
    width: 100,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "black",
    height: 35,
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  countText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});
