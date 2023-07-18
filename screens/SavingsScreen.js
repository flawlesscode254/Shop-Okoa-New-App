import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import db, { auth } from "../Firebase";

import DepositModal from "../components/DepositModal";
import WithdrawModal from "../components/WithdrawModal";

const SavingsScreen = () => {
  const [saccoData, setSaccoData] = useState({});
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

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
      <DepositModal
        showDepositModal={showDepositModal}
        setShowDepositModal={setShowDepositModal}
      />
      <WithdrawModal
        showWithdrawModal={showWithdrawModal}
        setShowWithdrawModal={setShowWithdrawModal}
      />
      <View style={styles.cardSection}>
        <Text style={styles.savingsTitle}>{saccoData?.saccoName}</Text>
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
            Ksh.{" "}
            {parseFloat(saccoData?.saccoTarget)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            Ksh.{" "}
            {parseFloat(saccoData?.contribution)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
              : parseFloat(
                  Number(saccoData?.saccoTarget) -
                    Number(saccoData?.contribution)
                )
                  .toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            Ksh.{" "}
            {parseFloat(saccoData?.loanLimit)
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
          onPress={() => {
            setShowDepositModal(true);
          }}
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
          onPress={() => {
            setShowWithdrawModal(true);
          }}
        >
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loanSection}>
        <Text style={styles.loansTitle}>Ksh. 3200</Text>
        <View style={styles.statsSection}>
          <View style={styles.statsDescription}>
            <Text style={styles.statsTitle}>Paid(Ksh)</Text>
            <Text>2400</Text>
          </View>
          <View style={styles.statsDescription}>
            <Text style={styles.statsTitle}>Balance(Ksh)</Text>
            <Text>800</Text>
          </View>
          <View style={styles.statsDescription}>
            <Text style={styles.statsTitle}>Interest(Ksh)</Text>
            <Text>200</Text>
          </View>
        </View>
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
    textTransform: "uppercase",
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
  statsSection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  statsDescription: {
    justifyContent: "center",
    alignItems: "center",
  },
  statsTitle: {
    fontWeight: "bold",
  },
  exitButton: {
    marginTop: 10,
    height: 40,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 7,
  },
  exitText: {
    color: "white",
  },
});
