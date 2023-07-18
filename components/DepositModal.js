import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { auth } from "../Firebase";

const DepositModal = ({ showDepositModal, setShowDepositModal }) => {
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const makeDeposit = () => {
    setShow(!show);
    fetch(
      "https://payments.shopokoa.com/payments/category/saccos/savings/deposit",
      {
        method: "POST",
        body: JSON.stringify({
          email: auth?.currentUser?.email,
          amount: amount,
          category: "savings",
          type: "deposit",
          phone_number: "254769084353",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((final) => {
        setShow(show);
        setStatus(final?.message);
        setTimeout(() => {
          setStatus("");
        }, 2500);
      });
  };

  return (
    <Modal
      isVisible={showDepositModal}
      style={styles.modalView}
      backdropOpacity={0.5}
    >
      <View style={styles.mainView}>
        <Text>Amount To Deposit</Text>
        <TextInput
          placeholder="Enter amount..."
          style={styles.input}
          keyboardType="numeric"
          maxLength={5}
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <View style={styles.statusSection}>
          {status && <Text style={styles.statusText}>{status}</Text>}
        </View>
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: "red",
              },
            ]}
            onPress={() => {
              setShowDepositModal(false);
            }}
          >
            <Text style={styles.actionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!amount}
            style={[
              styles.actionButton,
              {
                backgroundColor: "#07b836",
                opacity: amount ? 1 : 0.5,
              },
            ]}
            onPress={() => {
              makeDeposit();
            }}
          >
            {show ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <Text style={styles.actionText}>Deposit</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DepositModal;

const styles = StyleSheet.create({
  modalView: {
    borderRadius: 10,
  },
  mainView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    marginVertical: 15,
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 7,
  },
  actionSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  actionText: {
    color: "white",
  },
  statusSection: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "red",
  },
});
