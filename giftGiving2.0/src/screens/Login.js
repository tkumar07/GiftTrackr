import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../config/firebase";

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.password === password) {
          if (props && props.onSuccessfulLogin) {
            console.log("HELLO THERE ", username);
            props.onSuccessfulLogin(username);
          }
          console.log("Login successful");
        } else {
          Alert.alert("Login Error", "Incorrect password");
        }
      } else {
        Alert.alert("Login Error", "Username not found");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text>LOGIN</Text>
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Login;
