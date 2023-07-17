import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const UserInfo = ({ icon, text }) => {
  return (
    <View style={styles.userInfo}>
      <Ionicons name={icon} color="green" size={24} style={styles.infoIcon} />
      <Text>{text}</Text>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  userInfo: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "dotted",
    borderBottomColor: "black",
    marginVertical: 7,
    padding: 5,
  },
  infoIcon: {
    marginRight: 10,
  },
});
