import React, { useState } from "react";
import { View, TextInput, Text, Alert, Image, Dimensions } from "react-native";
import { collection, query, where, getDocs, addDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";

const SignUp = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (!username.trim() || !password.trim() || !passwordConf.trim()) {
        setErrorMessage("All fields are required");
        return;
      }

      if (password !== passwordConf) {
        setErrorMessage("Passwords do not match");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setErrorMessage("Username exists");
      } else {
        await addDoc(usersRef, {
          username: username,
          password: password,
          gifts: [],
          totalBudget: 0,
        });
        setErrorMessage("");
        Alert.alert("Success", "Account created successfully!");

        if (props && props.onSuccessfulSignUp) {
          props.onSuccessfulSignUp(username);
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during sign up");
    }
  };

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View style={[styles.container, { padding: 16 }]}>
      <View
        style={[
          styles.container,
          { marginBottom: 0, marginTop: marginTopAmnt },
        ]}
      >
        <Text style={styles.pageHeader}>Sign Up for GiftTrackr</Text>

        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter username"
          placeholderTextColor={errorMessage ? "red" : "#888"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          placeholderTextColor={errorMessage ? "red" : "#888"}
        />
        <TextInput
          style={styles.input}
          onChangeText={setPasswordConf}
          value={passwordConf}
          placeholder="Confirm password"
          secureTextEntry={true}
          placeholderTextColor={errorMessage ? "red" : "#888"}
        />
        <Text style={{ color: "red", marginTop: 0 }}>{errorMessage}</Text>

        <View style={styles.buttonsContainer}>
          <CustomButton title="Submit" onPress={handleSubmit} />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 0,
            justifyContent: "center",
          }}
        >
          <Text>Have an account? </Text>
          <Text
            style={{ color: styles.almostWhiteText }}
            onPress={() => props.onSwitchToLogin()}
          >
            Log in
          </Text>
        </View>
        <Image
          source={require("../../assets/giftTrackrLogo.png")}
          style={{
            width: "33%",
            aspectRatio: 1,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

export default SignUp;
