import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import db, { auth } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";

import Purchase from "../components/Purchase";

const CustomerPurchaseScreen = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    db.collection(`purchases${auth?.currentUser?.email}`).onSnapshot(
      (snapshot) => {
        setPurchases(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
  }, []);
  return (
    <View style={styles.mainView}>
      {purchases.length > 0 ? (
        <ScrollView contentContainerStyle={styles.productsScection}>
          {purchases.map((item) => {
            return (
              <Purchase
                key={item?.id}
                productName={item?.data?.data?.productName}
                productPrice={item?.data?.data?.price}
              />
            );
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

export default CustomerPurchaseScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  productsScection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 50,
    height: "100%",
  },
  warnSection: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
