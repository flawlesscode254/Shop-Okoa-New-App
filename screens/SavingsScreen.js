import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import db, { auth } from "../Firebase";

const SavingsScreen = () => {
  const [saccoData, setSaccoData] = useState({});

  useEffect(() => {
    db.collection("saccos")
      .doc(auth?.currentUser?.email)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setSaccoData(snapshot.data());
        } else {
          setSaccoData({});
        }
      });
  }, []);

  return (
    <View style={styles.mainView}>
      <View style={styles.cardSection}>
        <Text style={styles.savingsTitle}>SACCO SAVINGS</Text>
        <View style={styles.amountSection}>
          <Text style={styles.amountTitle}>TARGET:</Text>
          <Text
            style={[
              styles.amountCount,
              {
                color: "#07b836",
              },
            ]}
          >
            Ksh. {saccoData?.saccoTarget}
          </Text>
        </View>
        <View style={styles.amountSection}>
          <Text style={styles.amountTitle}>CONTRIBUTED:</Text>
          <Text
            style={[
              styles.amountCount,
              {
                color: "#07b836",
              },
            ]}
          >
            Ksh. {saccoData?.contribution}
          </Text>
        </View>
        <View style={styles.amountSection}>
          <Text style={styles.amountTitle}>BALANCE:</Text>
          <Text
            style={[
              styles.amountCount,
              {
                color: "red",
              },
            ]}
          >
            Ksh.{" "}
            {Number(saccoData?.saccoTarget) - Number(saccoData?.contribution) <
            0
              ? 0
              : Number(saccoData?.saccoTarget) -
                Number(saccoData?.contribution)}
          </Text>
        </View>
        <View style={styles.amountSection}>
          <Text style={styles.amountTitle}>LOAN LIMIT:</Text>
          <Text
            style={[
              styles.amountCount,
              {
                color: "#07b836",
              },
            ]}
          >
            Ksh. {saccoData?.loanLimit}
          </Text>
        </View>
      </View>
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "#07b836",
            },
          ]}
        >
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "red",
            },
          ]}
        >
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loanSection}>
        <Text style={styles.loansTitle}>Loans</Text>
        <View style={styles.loanAction}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "black",
              },
            ]}
          >
            <Text style={styles.actionText}>Repay Loan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "black",
              },
            ]}
          >
            <Text style={styles.actionText}>Request Loan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SavingsScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardSection: {
    backgroundColor: "black",
    width: "100%",
    padding: 20,
    borderRadius: 7,
  },
  savingsTitle: {
    color: "#07b836",
    fontWeight: "bold",
    fontSize: 20,
  },
  userName: {
    color: "white",
    marginVertical: 10,
    fontSize: 17,
  },
  amountSection: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
  amountTitle: {
    color: "white",
    marginRight: 10,
  },
  amountCount: {
    fontStyle: "italic",
  },
  actionSection: {
    marginTop: 30,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  actionButton: {
    width: 100,
    height: 40,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "white",
  },
  loansTitle: {
    fontSize: 18,
    marginTop: 30,
  },
  loanAction: {
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  loanSection: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    padding: 20,
    borderStyle: "dotted",
  },
});
