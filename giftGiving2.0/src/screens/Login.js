import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../config/firebase";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        setErrorMessage("All fields are required");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.password === password) {
          if (props && props.onSuccessfulLogin) {
            console.log("HELLO THERE", username);
            props.onSuccessfulLogin(username);
          }
          console.log("Login successful");
        } else {
          setErrorMessage("Incorrect password");
        }
      } else {
        setErrorMessage("Username not found");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const screenHeight = Dimensions.get("window").height;
  let marginTopAmnt = screenHeight * 0.25;

  if (marginTopAmnt > 150) {
    marginTopAmnt = 150;
  }

  return (
    <View style={styles.pageContainer}>
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
          {password.length > 0 && (
            <View style={styles.passwordContainer}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="black"
                onPress={toggleShowPassword}
                style={styles.eyeIcon}
              />
            </View>
          )}
        </View>
        <Text style={{ color: "red", marginTop: 5 }}>{errorMessage}</Text>

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
          style={styles.logo}
        />
      </View>
    </View>
  );
};

export default Login;
