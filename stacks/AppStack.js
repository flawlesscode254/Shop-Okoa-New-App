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
import CustomerDebtScreen from "../screens/CustomerDebtScreen";
import OkoaScreen from "../screens/OkoaScreen";
import TrustScoreScreen from "../screens/TrustScoreScreen";
import PayBillScreen from "../screens/PayBillsScreen";
import FamilySupportScreen from "../screens/FamilySupportScreen";
import HealthInsuranceScreen from "../screens/HealthInsuranceScreen";

const AppStack = () => {
  const [user, setUser] = useState("");
  const [cartCount, setCartCount] = useState(0);

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
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Pay Debt"
        component={CustomerDebtScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Shop Mobile Services"
        component={OkoaScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Trust Score"
        component={TrustScoreScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Pay Bills"
        component={PayBillScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Family Support"
        component={FamilySupportScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Health Insurance"
        component={HealthInsuranceScreen}
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
