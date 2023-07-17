import { StyleSheet, ScrollView } from "react-native";
import React from "react";

import Sacco from "../components/Sacco";

const SaccosScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      <Sacco
        saccoBackground="#82bef2"
        saccoName="Bike Sacco"
        saccoLocation="Nairobi"
        saccoMembers={200}
        saccoRank={1}
        saccoContributions={100000}
        saccoTarget={5000}
      />
    </ScrollView>
  );
};

export default SaccosScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
