import React, { useState } from "react";
import { View, TextInput, Text, Button, Alert } from "react-native";
import { collection, query, where, getDocs, addDoc } from "@firebase/firestore";
import { db } from "../config/firebase";

const SignUp = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    console.log("HERE");
    try {
      if (password != passwordConf) {
        Alert.alert("Passwords do not match");
      } else {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          Alert.alert("Username exists");
        } else {
          await addDoc(usersRef, {
            username: username,
            password: password,
            gifts: [],
            totalBudget: 0,
          });
          console.log("Hello");
          Alert.alert("Success", "Account created successfully!");

          if (props && props.onSuccessfulSignUp) {
            props.onSuccessfulSignUp(username);
          }
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during sign up");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text>SIGN UP</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter username"
      />

      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
      />
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={setPasswordConf}
        value={passwordConf}
        placeholder="Confirm password"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default SignUp;
