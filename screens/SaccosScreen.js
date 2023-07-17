import { StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import db, { auth } from "../Firebase";

import Sacco from "../components/Sacco";
import SavingsScreen from "./SavingsScreen";

const SaccosScreen = () => {
  const [sacco, setSacco] = useState(null);

  useEffect(() => {
    db.collection("saccos")
      .doc(auth?.currentUser?.email)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setSacco(snapshot.data());
        } else {
          setSacco({});
        }
      });
  }, []);

  return (
    <View>
      {sacco ? (
        <>
          {Object.keys(sacco).length > 0 ? (
            <SavingsScreen />
          ) : (
            <ScrollView contentContainerStyle={styles.saccosView}>
              <Sacco
                saccoBackground="#82bef2"
                saccoName="Bike Sacco"
                saccoLocation="Nairobi"
                saccoMembers={200}
                saccoContributions={100000}
                saccoTarget={5000}
              />
            </ScrollView>
          )}
        </>
      ) : (
        <View style={styles.indicatorSection}>
          <ActivityIndicator size={50} color="#07b836" />
        </View>
      )}
    </View>
  );
};

export default SaccosScreen;

const styles = StyleSheet.create({
  saccosView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  indicatorSection: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
