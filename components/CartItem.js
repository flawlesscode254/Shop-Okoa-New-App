import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import db, { auth } from "../Firebase";

const CartItem = ({ data }) => {
  const [show, setShow] = useState(false);
  const addToCart = () => {
    setShow(!show);
    db.collection(`cart${auth?.currentUser?.email}`)
      .add({
        productName: "Soap",
        price: 3000,
        productImage: "sdsjdkskdjsds",
        shopId: "sdnslsdklslkds",
      })
      .then(() => {
        setShow(show);
      });
  };

  return (
    <View style={styles.mainView}>
      <Image source={require("../assets/phones.png")} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {data?.productName}
      </Text>
      <Text style={styles.price}>Ksh. {data?.price}</Text>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => {
          addToCart();
        }}
      >
        {show ? (
          <ActivityIndicator size={20} color="white" />
        ) : (
          <Text style={styles.buttonText}>Add to Cart</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  mainView: {
    width: "45%",
    backgroundColor: "white",
    height: 150,
    marginVertical: 10,
    borderRadius: 7,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    aspectRatio: 4 / 3,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 1,
  },
  price: {
    color: "#07b836",
    fontWeight: "500",
  },
  cartButton: {
    width: 100,
    backgroundColor: "#07b836",
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    borderRadius: 7,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
  },
});