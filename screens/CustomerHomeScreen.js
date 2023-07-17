import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import db, { auth } from "../Firebase";

import Cash from "../assets/pay-mobile.gif";
import Insurance from "../assets/health-insurance.gif";
import SavingsPod from "../assets/savings-pod.gif";
import Bills from "../assets/pay-bills.gif";
import PayDebt from "../assets/pay-debt.gif";
import Trustscore from "../assets/trust-score.gif";
import FamilySupport from "../assets/family-support.gif";
import ViewShops from "../assets/view-shops.gif";

import Service from "../components/Service";

const CustomerHomeScreen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      db.collection("users")
        .doc(authUser?.uid)
        .get()
        .then((info) => {
          setUser(info?.data());
        });
    });
  }, []);

  return (
    <View style={styles.mainView}>
      <Text style={styles.greetingsText}>Hello, {user?.username}</Text>
      <View style={styles.servicesSection}>
        <Service
          title={"Okoa"}
          image={Cash}
          link={"SHOPOKOA MOBILE SERVICES"}
        />
        <Service title={"Shop Online"} image={ViewShops} link={"Shops"} />
        <Service title={"Pay Debt"} image={PayDebt} link={"PAY MY DEBT"} />
        <Service title={"Savings"} image={SavingsPod} link={"SAVINGS"} />
        <Service
          title={"Trust Score"}
          image={Trustscore}
          link={"TRUST SCORE"}
        />
        <Service
          title={"Health Insurance"}
          image={Insurance}
          link={"HEALTH INSURANCE"}
        />
        <Service title={"Pay Bills"} image={Bills} link={"PAY BILLS"} />
        <Service
          title={"Family Support"}
          image={FamilySupport}
          link={"FAMILY SUPPORT"}
        />
      </View>
    </View>
  );
};

export default CustomerHomeScreen;

const styles = StyleSheet.create({
  mainView: {
    padding: 10,
  },
  greetingsText: {
    fontSize: 17,
    fontWeight: "500",
  },
  servicesSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 20
  },
});