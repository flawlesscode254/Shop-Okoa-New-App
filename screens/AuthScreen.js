import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const navigation = useNavigation();

  const goAccount = () => {
    navigation.navigate("CUSTOMER SIGN UP");
  };

  const goVendorRegister = () => {
    navigation.navigate("VENDOR SIGN UP");
  };
  return (
    <View style={styles.container}>
      <View style={styles.collector}>
        <TouchableOpacity onPress={goAccount} style={styles.account}>
          <Text style={styles.description}>Customer Account</Text>
          <View style={styles.continue}>
            <AntDesign name="rightcircleo" color={"#6BDDB0"} size={18} />
            <Text style={styles.proceed}>Proceed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.account} onPress={goVendorRegister}>
          <Text style={styles.description}>Vendor Account</Text>
          <View style={styles.continue}>
            <AntDesign name="rightcircleo" color={"#6BDDB0"} size={18} />
            <Text style={styles.proceed}>Proceed</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  proceed: {
    color: "#6BDDB0",
    marginLeft: 7,
  },
  description: {
    color: "#FFFFFF",
    marginBottom: 20,
    fontSize: 20,
  },
  account: {
    marginTop: 50,
    width: "100%",
    paddingVertical: 50,
    backgroundColor: "#1E293B",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  collector: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginHorizontal: 20,
  },
  continue: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
