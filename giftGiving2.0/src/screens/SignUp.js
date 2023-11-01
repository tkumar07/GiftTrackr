import React, { useState } from "react";
import { View, TextInput, Text, Alert, Image } from "react-native";
import { collection, query, where, getDocs, addDoc } from "@firebase/firestore";
import { db } from "../config/firebase";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton"; // Assuming CustomButton is used for consistency

const SignUp = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    try {
      if (password !== passwordConf) {
        Alert.alert("Passwords do not match");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        Alert.alert("Username exists");
      } else {
        await addDoc(usersRef, {
          username: username,
          password: password,
          gifts: [],
          totalBudget: 0,
        });
        Alert.alert("Success", "Account created successfully!");

        if (props && props.onSuccessfulSignUp) {
          props.onSuccessfulSignUp();
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during sign up");
    }
  };

  return (
    <View style={[styles.container, { padding: 16 }]}>
      <Image
        source={require("../../assets/giftTrackrLogo.png")}
        style={{
          width: "33%",
          aspectRatio: 1,
          resizeMode: "contain",
        }}
      />
      <Text style={styles.pageHeader}>Sign Up for GiftTrackr</Text>

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter username"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        onChangeText={setPasswordConf}
        value={passwordConf}
        placeholder="Confirm password"
        secureTextEntry={true}
      />

      <View style={styles.buttonsContainer}>
        <CustomButton title="Submit" onPress={handleSubmit} />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 0,
          justifyContent: "center",
        }}
      >
        <Text>Have an account? </Text>
        <Text
          style={{ color: styles.almostWhiteText }} // Using the text color style
          onPress={() => props.onSwitchToLogin()}
        >
          Log in
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
