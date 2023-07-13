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
import useAuth from "../state-manager";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("");

  const navigation = useNavigation();

  const session = useAuth();

  const signIn = () => {
    setShow(!show);
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regEx)) {
      setStatus("Wrong email format!!!");
      setTimeout(() => {
        setStatus("");
      }, 2500);
    } else {
      auth
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then((authUser) => {
          db.collection("users")
            .doc(authUser.user.uid)
            .get()
            .then(async (info) => {
              await session.persist(info?.data()).then(() => {
                setEmail("");
                setPassword("");
                setShow(show);
              });
            });
        })
        .catch((err) => {
          setStatus(err?.message);
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

      <TouchableOpacity
        style={styles.forgotPasswordSection}
        onPress={() => {
          navigation.navigate("FORGOT PASSWORD");
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!email && !password}
        style={[
          styles.signInButton,
          {
            opacity: email && password ? 1 : 0.5,
          },
        ]}
        onPress={() => {
          signIn();
        }}
      >
        {show ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.signInText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.existingSection}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => {
            navigation.navigate("AUTH");
          }}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  inputSection: {
    width: "100%",
    marginVertical: 10,
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
  forgotPasswordSection: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  signInButton: {
    backgroundColor: "#07b836",
    height: 50,
    borderRadius: 7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  signInText: {
    fontSize: 17,
    color: "white",
  },
  existingSection: {
    width: "100%",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signUpButton: {
    marginLeft: 10,
  },
  signUpText: {
    fontSize: 17,
    color: "blue",
    textDecorationLine: "underline",
  },
  showPasswordSection: {
    position: "absolute",
    right: 10,
    top: 35,
  },
  statusText: {
    color: "red",
  },
});
