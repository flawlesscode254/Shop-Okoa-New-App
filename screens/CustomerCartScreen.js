import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import db, { auth } from "../Firebase";

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
      <ScrollView contentContainerStyle={styles.productsScection}>
        {cart.map((item) => {
          return <CartItem key={item?.id} data={item?.data} />;
        })}
      </ScrollView>
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
});
