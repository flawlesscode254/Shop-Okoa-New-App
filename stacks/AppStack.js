import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
              <View
                style={{
                  width: 100,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  backgroundColor: "black",
                  height: 35,
                  borderRadius: 25,
                  paddingHorizontal: 15,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  {cartCount}
                </Text>
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
    </Stack.Navigator>
  );
};

export default AppStack;
