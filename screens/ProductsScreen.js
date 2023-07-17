import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";

import Product from "../components/Product";

const ProductsScreen = () => {
  return (
    <View>
      <ScrollView contentContainerStyle={styles.productsScection}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </ScrollView>
    </View>
  );
};

export default ProductsScreen;

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
