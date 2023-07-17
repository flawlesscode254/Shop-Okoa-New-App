import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import SaccoModal from "./SaccoModal";

const Sacco = ({
  saccoBackground,
  id,
  saccoName,
  saccoRank,
  saccoLocation,
  saccoMembers,
  saccoContributions,
  saccoTarget,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <TouchableOpacity
      style={[
        styles.mainView,
        {
          backgroundColor: saccoBackground,
        },
      ]}
      onPress={() => {
        setShowModal(true);
      }}
    >
      <SaccoModal
        saccoName={saccoName}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Image source={require("../assets/phones.png")} style={styles.image} />
      <View style={styles.contentSection}>
        <View style={styles.topSection}>
          <View>
            <Text style={styles.title}>{saccoName}</Text>
            <Text style={styles.location}>{saccoLocation}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoCount}>{saccoRank}</Text>
            <Text style={styles.infoTitle}>Ranking</Text>
          </View>
        </View>
        <View style={styles.bottomSection}>
          <View style={styles.infoSection}>
            <Text style={styles.infoCount}>{saccoMembers}</Text>
            <Text style={styles.infoTitle}>Members</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoCount}>{saccoContributions}</Text>
            <Text style={styles.infoTitle}>Contributions</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoCount}>{saccoTarget}</Text>
            <Text style={styles.infoTitle}>Target</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Sacco;

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    padding: 10,
    borderRadius: 7,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    elevation: 3,
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 999,
    resizeMode: "contain",
  },
  contentSection: {
    flex: 1,
    marginLeft: 10,
  },
  topSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  infoSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoCount: {
    color: "white",
  },
  infoTitle: {
    color: "black",
  },
  bottomSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  location: {
    color: "white",
  },
});