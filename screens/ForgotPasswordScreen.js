import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth } from "../Firebase";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);

  const resetPassword = () => {
    setShow(!show);
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regEx)) {
      setStatus("Wrong email format!!!");
      setShow(show);
      setTimeout(() => {
        setStatus("");
      }, 2500);
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setEmail("");
          setStatus("Password reset email has been sent");
          setShow(show);
          setTimeout(() => {
            setStatus("");
          }, 2500);
        })
        .catch((err) => {
          setStatus(err?.message);
          setShow(show);
          setTimeout(() => {
            setStatus("");
          }, 2500);
        });
    }
  };

  return (
    <View style={styles.mainView}>
      <View>
        {status && <Text style={styles.statusText}>** {status} **</Text>}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputText}>Email Address</Text>
        <TextInput
          placeholder="Enter Email Address..."
          style={styles.inputField}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      <TouchableOpacity
        disabled={!email}
        style={[
          styles.submitButton,
          {
            opacity: email ? 1 : 0.5,
          },
        ]}
        onPress={() => {
          resetPassword();
        }}
      >
        {show ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.submitText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  inputSection: {
    width: "100%",
  },
  inputField: {
    height: 40,
    width: "100%",
    borderRadius: 7,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: "#07b836",
  },
  inputText: {
    color: "black",
  },
  statusText: {
    color: "red",
  },
  submitButton: {
    backgroundColor: "#07b836",
    height: 50,
    borderRadius: 7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  submitText: {
    fontSize: 17,
    color: "white",
  },
});
