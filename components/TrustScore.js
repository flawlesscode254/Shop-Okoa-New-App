import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TrustScore = () => {
  return (
    <View style={styles.trustScoreSection}>
      <View>
        <Text style={styles.trustScoreTitle}>TRUST SCORE</Text>
        <Text style={styles.amountText}>Loan Limit: Ksh.5,000</Text>
        <Text style={styles.amountText}>Borrowed: Ksh.4,000</Text>
      </View>
      <View style={styles.trustScoreValue}>
        <Text>-3</Text>
      </View>
    </View>
  );
};

export default TrustScore;

const styles = StyleSheet.create({
  trustScoreSection: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  trustScoreTitle: {
    color: "#07b836",
    fontWeight: "500",
  },
  trustScoreValue: {
    height: 80,
    width: 80,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  amountText: {
    fontWeight: "500",
    marginVertical: 3,
  },
});
