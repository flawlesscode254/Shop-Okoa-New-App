import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import db, { auth } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";

import CartItem from "../components/CartItem";

const CustomerCartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    db.collection(`cart${auth?.currentUser?.email}`).onSnapshot((snapshot) => {
      setCart(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <View>
      {cart.length > 0 ? (
        <ScrollView contentContainerStyle={styles.productsScection}>
          {cart.map((item) => {
            return <CartItem key={item?.id} id={item?.id} data={item?.data} />;
          })}
        </ScrollView>
      ) : (
        <View style={styles.warnSection}>
          <Ionicons name="alert-circle-outline" size={100} />
          <Text>There is nothing to show here</Text>
        </View>
      )}
    </View>
  );
};

export default CustomerCartScreen;

const styles = StyleSheet.create({
  productsScection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
  },
  warnSection: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
