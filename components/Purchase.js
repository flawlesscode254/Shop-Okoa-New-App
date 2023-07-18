import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Purchase = ({ productName, productPrice }) => {
  return (
    <View style={styles.mainView}>
      <Image source={require("../assets/phones.png")} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {productName}
      </Text>
      <Text style={styles.price}>Ksh. {productPrice}</Text>
    </View>
  );
};

export default Purchase;

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
});
