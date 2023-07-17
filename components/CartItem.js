import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import db, { auth } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ id, data }) => {
  const deleteFromCart = () => {
    db.collection(`cart${auth?.currentUser?.email}`).doc(id).delete();
  };

  const addQuantity = () => {
    db.collection(`cart${auth?.currentUser?.email}`)
      .doc(id)
      .update({
        quantity: Number(data?.quantity) + 1,
      });
  };

  const reduceQuantity = () => {
    db.collection(`cart${auth?.currentUser?.email}`)
      .doc(id)
      .update({
        quantity: Number(data?.quantity) - 1,
      });
  };

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          deleteFromCart();
        }}
      >
        <Ionicons name="trash" size={25} color="red" />
      </TouchableOpacity>
      <Image source={require("../assets/phones.png")} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {data?.productName}
      </Text>
      <Text style={styles.price}>
        Ksh. {Number(data?.price) * Number(data?.quantity)}
      </Text>
      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              opacity: data?.quantity === 1 ? 0.5 : 1,
            },
          ]}
          disabled={data?.quantity === 1}
          onPress={() => {
            reduceQuantity();
          }}
        >
          <Text style={styles.actionText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{data?.quantity}</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            addQuantity();
          }}
        >
          <Text style={styles.actionText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  mainView: {
    width: "45%",
    backgroundColor: "white",
    height: 180,
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
  buttonText: {
    color: "white",
  },
  deleteButton: {
    alignSelf: "flex-end",
  },
  actionsSection: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#07b836",
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  actionText: {
    fontWeight: "500",
    fontSize: 16,
    color: "white",
  },
  countText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
