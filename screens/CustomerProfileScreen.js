import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import db, { auth } from "../Firebase";

import TrustScore from "../components/TrustScore";
import UserInfo from "../components/UserInfo";

const CustomerProfileScreen = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    db.collection("users")
      .doc(auth?.currentUser?.uid)
      .get()
      .then((info) => {
        setUser(info?.data());
      });
  }, []);

  const signOut = () => {
    setShow(!show);
    auth.signOut().then(() => {
      setShow(show);
    });
  };
  return (
    <View style={styles.mainView}>
      <TrustScore />

      <View style={styles.infoSection}>
        <UserInfo icon="person" text={user?.username} />
        <UserInfo icon="mail" text={user?.email} />
        <UserInfo icon="call" text={user?.phoneNumber} />
      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          signOut();
        }}
        disabled={show}
      >
        {show ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.signOutText}>Sign Out</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomerProfileScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  infoSection: {
    marginTop: 30,
    width: "100%",
  },
  signOutButton: {
    height: 40,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    marginTop: 40,
    width: "100%",
  },
  signOutText: {
    fontSize: 17,
    color: "white",
  },
});
