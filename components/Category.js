import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const Category = ({ image, title, activeTab, setActiveTab }) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainView,
        {
          backgroundColor: activeTab === title ? "#0E2A47" : "white",
        },
      ]}
      onPress={() => {
        setActiveTab(title);
      }}
    >
      <Image source={image} style={styles.image} />
      <Text
        style={{
          color: activeTab === title ? "white" : "black",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  mainView: {
    height: 45,
    borderRadius: 15,
    marginHorizontal: 10,
    elevation: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  image: {
    height: 30,
    width: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
});
