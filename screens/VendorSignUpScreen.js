import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import db, { auth } from "../Firebase";

const VendorSignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const navigation = useNavigation();

  const signUp = () => {
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
        .createUserWithEmailAndPassword(email.trim(), password.trim())
        .then((authUser) => {
          db.collection("users")
            .doc(authUser?.user?.uid)
            .set({
              email: email,
              username: username,
              phoneNumber: phoneNumber,
              type: "vendor",
            })
            .then(() => {
              setUsername("");
              setEmail("");
              setPhoneNumber("");
              setPassword("");
              setConfirmPassword("");
              setShow(show);
            });
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
        <Text style={styles.inputText}>Full Name</Text>
        <TextInput
          placeholder="Enter Full Name..."
          style={styles.inputField}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
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

      <View style={styles.inputSection}>
        <Text style={styles.inputText}>Phone Number</Text>
        <TextInput
          placeholder="Enter Phone Number..."
          style={styles.inputField}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          placeholder="Enter Password..."
          style={styles.inputField}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.showPasswordSection}
          onPress={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <Ionicons name="eye-off" size={24} color="black" />
          ) : (
            <Ionicons name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.inputText}>Confirm Password</Text>
        <TextInput
          placeholder="Enter Confirm Password..."
          style={styles.inputField}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          style={styles.showPasswordSection}
          onPress={() => {
            setShowConfirmPassword(!showConfirmPassword);
          }}
        >
          {showConfirmPassword ? (
            <Ionicons name="eye-off" size={24} color="black" />
          ) : (
            <Ionicons name="eye" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        disabled={
          !email && !password && !username && !phoneNumber && !confirmPassword
        }
        style={[
          styles.signUpButton,
          {
            opacity:
              email && password && username && phoneNumber && confirmPassword
                ? 1
                : 0.5,
          },
        ]}
        onPress={() => {
          signUp();
        }}
      >
        {show ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.signUpText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.existingSection}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            navigation.navigate("SIGN IN");
          }}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VendorSignUpScreen;

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
  showPasswordSection: {
    position: "absolute",
    right: 10,
    top: 35,
  },
  statusText: {
    color: "red",
  },
  signUpButton: {
    backgroundColor: "#07b836",
    height: 50,
    borderRadius: 7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  signUpText: {
    fontSize: 17,
    color: "white",
  },
  signInButton: {
    marginLeft: 10,
  },
  signInText: {
    fontSize: 17,
    color: "blue",
    textDecorationLine: "underline",
  },
  existingSection: {
    width: "100%",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
