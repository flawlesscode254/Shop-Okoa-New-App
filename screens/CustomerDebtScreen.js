import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import db, { auth } from "../Firebase";

const CustomerDebtScreen = () => {
  const [debt, setDebt] = useState({});
  const [payment, setPayment] = useState({});
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    db.collection(`purchases${auth?.currentUser?.email}`).onSnapshot(
      (snapshot) => {
        let info = snapshot.docs.map((doc) => ({
          id: doc.id,
          price: doc?.data()?.data?.price,
        }));
        let sum = info.reduce((a, b) => Number(a?.price) + Number(b?.price));
        setDebt({
          total: Number(sum),
          interest: Number(sum) * 0.075,
        });
      }
    );
  }, []);

  useEffect(() => {
    db.collection("paidPurchases")
      .doc(auth?.currentUser?.email)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setPayment({
            paid: snapshot.data().paid,
          });
        } else {
          setPayment({
            paid: 0,
          });
        }
      });
  }, []);

  const makePayment = () => {
    setShow(!show);
    fetch("https://payments.shopokoa.com/payments/category/debt/deposit/", {
      method: "POST",
      body: JSON.stringify({
        email: auth?.currentUser?.email,
        amount: amount,
        category: "debt",
        type: "deposit",
        phone_number: "254769084353",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
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
    <View style={styles.mainView}>
      <View style={styles.statsView}>
        <Text style={styles.totalText}>
          Ksh.
          {parseFloat(Number(debt?.total) + Number(debt?.interest))
            .toFixed(0)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <View style={styles.firstSection}>
          <View style={styles.infoSection}>
            <Text style={styles.amountTitle}>Actual(Ksh)</Text>
            <Text style={styles.amountCount}>
              {parseFloat(Number(debt?.total))
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.amountTitle}>Interest(Ksh)</Text>
            <Text style={styles.amountCountRef}>
              {" "}
              {parseFloat(Number(debt?.interest))
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        </View>
        <View style={styles.secondSection}>
          <View style={styles.infoSection}>
            <Text style={styles.amountTitle}>Paid(Ksh)</Text>
            <Text style={styles.amountCount}>
              {" "}
              {parseFloat(Number(payment?.paid))
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.amountTitle}>Balance(Ksh)</Text>
            <Text style={styles.amountCountRef}>
              {Number(debt?.total) +
                Number(debt?.interest) -
                Number(payment?.paid) <
              0
                ? 0
                : parseFloat(
                    Number(debt?.total) +
                      Number(debt?.interest) -
                      Number(payment?.paid)
                  )
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.statusSection}>
        {status && <Text style={styles.statusText}>{status}</Text>}
      </View>
      <View style={styles.paymentSection}>
        <TextInput
          placeholder="Enter amount to pay..."
          maxLength={10}
          keyboardType="numeric"
          value={amount}
          onChangeText={(text) => setAmount(text)}
          style={styles.input}
        />
        <TouchableOpacity
          disabled={!amount}
          style={[
            styles.payButton,
            {
              opacity: amount ? 1 : 0.5,
            },
          ]}
          onPress={() => {
            makePayment();
          }}
        >
          {show ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <Text style={styles.payText}>Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerDebtScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  statsView: {
    width: "100%",
    padding: 20,
    borderRadius: 7,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    fontSize: 22,
    color: "white",
    marginVertical: 10,
  },
  firstSection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  infoSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  amountTitle: {
    color: "#07b836",
  },
  amountCount: {
    color: "white",
  },
  secondSection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  amountCountRef: {
    color: "red",
  },
  paymentSection: {
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
  },
  payButton: {
    backgroundColor: "#07b836",
    height: 40,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  payText: {
    color: "white",
  },
  statusSection: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  statusText: {
    color: "red",
  },
});
