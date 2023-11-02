import React, { useState } from "react";
import { View, Text, TextInput, Alert, Image, Dimensions } from "react-native";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../config/firebase";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";


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
        <Text style={styles.pageHeader}>Log in to GiftTrackr</Text>

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
          secureTextEntry // Hides the password
        />
        <View style={[styles.buttonsContainer, { marginBottom: 0 }]}>
          <CustomButton title="Log In" onPress={handleSubmit} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 0,
            justifyContent: "center",
          }}
        >
          <Text>Don't have an account? </Text>
          <Text
            style={{ color: styles.almostWhiteText }}
            onPress={() => props.onSwitchToSignUp()}
          >
            Sign up
          </Text>
        </View>
        <Image
          source={require("../../assets/giftTrackrLogo.png")}
          style={{
            width: "33%",
            aspectRatio: 1,
            resizeMode: "contain",
            marginTop: 0,
          }}
        />
      </View>
    </View>
  );
};

export default Login;
