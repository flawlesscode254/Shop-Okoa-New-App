import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import db, { auth } from "../Firebase";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import CartItem from "../components/CartItem";

const CustomerCartScreen = () => {
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState(0);
  const [cartAmount, setCartAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    db.collection(`cart${auth?.currentUser?.email}`).onSnapshot((snapshot) => {
      let info = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setCart(info);
      if (info.length === 1) {
        setCartItems(Number(info[0]?.data?.quantity));
        setCartAmount(
          Number(info[0]?.data?.price) * Number(info[0]?.data?.quantity)
        );
      } else if (info.length > 1) {
        let totalCount = 0;
        for (let item of info) {
          totalCount += Number(item?.data?.quantity);
        }
        setCartItems(totalCount);

        let totalAmount = 0;
        for (let item of info) {
          totalAmount +=
            Number(item?.data?.price) * Number(item?.data?.quantity);
        }
        setCartAmount(totalAmount);
      }
    });
  }, []);

  const makePurchase = () => {
    setShow(!show);
    for (let i = 0; i < cart.length; i++) {
      db.collection(`purchases${auth?.currentUser?.email}`)
        .add(cart[i])
        .then(() => {
          db.collection(`cart${auth?.currentUser?.email}`)
            .doc(cart[i]?.id)
            .delete();
        });
    }
    setShow(show);
  };

  return (
    <View style={styles.mainView}>
      <Modal
        isVisible={showModal}
        style={styles.modalView}
        backdropOpacity={0.5}
      >
        <View style={styles.entryView}>
          <Text>Complete Purchase?</Text>
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: "red",
                },
              ]}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={show}
              style={[
                styles.actionButton,
                {
                  backgroundColor: "#07b836",
                  opacity: show ? 0.5 : 1,
                },
              ]}
              onPress={() => {
                makePurchase();
              }}
            >
              {show ? (
                <ActivityIndicator size={25} color="white" />
              ) : (
                <Text style={styles.actionText}>Complete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {cart.length > 0 ? (
        <ScrollView contentContainerStyle={styles.productsScection}>
          {cart.map((item) => {
            return <CartItem key={item?.id} id={item?.id} data={item?.data} />;
          })}
        </ScrollView>
      ) : (
        <View style={styles.warnSection}>
          <Ionicons name="alert-circle-outline" size={100} />
          <Text>There is nothing to show here</Text>
        </View>
      )}
      <View style={styles.purchaseArea}>
        <View style={styles.firstSection}>
          <View style={styles.countSection}>
            <Ionicons name="cart" size={20} color="yellow" />
            <Text style={styles.infoText}>{cartItems}</Text>
          </View>
          <View style={styles.amountSection}>
            <Ionicons name="wallet" size={20} color="yellow" />
            <Text style={styles.infoText}>
              Ksh.{" "}
              {parseFloat(cartAmount)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <Text style={styles.purchaseText}>Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomerCartScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
  },
  productsScection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    marginBottom: 50,
    height: "100%",
  },
  warnSection: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  purchaseArea: {
    height: 50,
    backgroundColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  countSection: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 20,
  },
  infoText: {
    color: "white",
    marginLeft: 10,
  },
  amountSection: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  firstSection: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  purchaseButton: {
    width: 100,
    backgroundColor: "yellow",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  purchaseText: {
    fontWeight: "500",
  },
  modalView: {
    borderRadius: 10,
  },
  entryView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  actionSection: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  actionButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    height: 40,
  },
  actionText: {
    color: "white",
  },
});
