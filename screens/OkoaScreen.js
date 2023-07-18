import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import db, { auth } from "../Firebase";

const OkoaScreen = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const handleBarCodeScanned = ({ data }) => {
    setShowScanner(false);
    setAccountNumber(data);
  };

  const completePayment = async () => {
    setShow(!show);
    db.collection("users")
      .doc(auth?.currentUser?.uid)
      .get()
      .then((info) => {
        fetch(
          "https://payments.shopokoa.com/payments/category/okoa/merchant/payment",
          {
            method: "POST",
            body: JSON.stringify({
              email: auth?.currentUser?.email,
              amount: amount,
              category: "okoa",
              type: "payment",
              accountNumber: accountNumber,
              phone_number: `254${info?.data()?.phoneNumber?.slice(1)}`,
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
      });
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.titleText}>Lipa Na SMS</Text>
      <View style={styles.guideSection}>
        <Text style={styles.guideText}>
          Lipa na SMS empowers you to pay on credit on any mobile. Pay for
          unexpected bills and shopping with ease. Experience financial security
          during financial setbacks
        </Text>
      </View>
      {showScanner && (
        <>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={[
              StyleSheet.absoluteFillObject,
              {
                marginTop: 20,
                zIndex: 100,
              },
            ]}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setShowScanner(false);
            }}
          >
            <Text style={styles.confirmText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        onPress={async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          if (status === "granted") {
            setShowScanner(true);
          } else if (status === "denied") {
            alert("You need to allow camera access for you to scan code.");
          }
        }}
        style={styles.imageSection}
      >
        <Image source={require("../assets/scan.png")} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.inputSection}>
        <Text>Account Number</Text>
        <TextInput
          placeholder="Enter account number..."
          value={accountNumber}
          onChangeText={(text) => setAccountNumber(text)}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputSection}>
        <Text>Amount</Text>
        <TextInput
          placeholder="Enter amount..."
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.statusSection}>
        {status && <Text style={styles.statusText}>{status}</Text>}
      </View>
      <TouchableOpacity
        disabled={!amount && !accountNumber}
        style={[
          styles.confirmButton,
          {
            opacity: !amount && !accountNumber ? 0.5 : 1,
          },
        ]}
        onPress={() => {
          completePayment();
        }}
      >
        {show ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.confirmText}>Confirm</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OkoaScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "500",
  },
  guideSection: {
    marginVertical: 15,
    backgroundColor: "#07b836",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 7,
  },
  guideText: {
    color: "white",
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  imageSection: {
    marginVertical: 20,
  },
  inputSection: {
    width: "100%",
  },
  input: {
    marginVertical: 10,
    height: 40,
    borderRadius: 7,
    borderWidth: 1,
    padding: 10,
  },
  confirmButton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#07b836",
    marginTop: 40,
  },
  confirmText: {
    color: "white",
  },
  cancelButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "red",
    zIndex: 100,
    position: "absolute",
    bottom: 20,
    height: 40,
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
