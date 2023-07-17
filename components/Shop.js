import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const Shop = () => {
  return (
    <TouchableOpacity style={styles.mainView}>
      <Image source={require("../assets/clothes.png")} style={styles.image} />
      <View style={styles.infoSection}>
        <Text numberOfLines={1} style={styles.shopName}>
          Shop One
        </Text>
        <Text numberOfLines={1} style={styles.location}>
          Kasarani, Nairobi
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Shop;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 7,
    elevation: 1,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 7,
    resizeMode: "contain",
    marginRight: 10,
  },
  infoSection: {
    flex: 1,
  },
  shopName: {
    fontWeight: "500",
    fontSize: 16,
  },
  location: {
    color: "gray",
  },
});
