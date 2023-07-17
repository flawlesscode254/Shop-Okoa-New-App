import { StyleSheet, ActivityIndicator, View } from "react-native";
import React from "react";

const LoaderScreen = () => {
  return (
    <View style={styles.main}>
      <ActivityIndicator color={"green"} size={50} />
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
