import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Service = ({ title, image, link }) => {
  const navigation = useNavigation();

  const goTo = () => {
    if (link) {
      navigation.navigate(link);
    }
  };

  return (
    <TouchableOpacity
      style={styles.mainView}
      onPress={() => {
        goTo();
      }}
    >
      <Image source={image} style={styles.image} />
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Service;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    borderRadius: 11,
    height: 70,
    width: "48%",
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    elevation: 10,
  },
  image: {
    width: 40,
    height: 40,
    aspectRatio: 4 / 3,
    resizeMode: "contain",
    marginRight: 6,
  },
  titleText: {
    marginTop: 5,
    fontWeight: "bold",
    color: "black",
    fontFamily: "sans-serif",
  },
});
