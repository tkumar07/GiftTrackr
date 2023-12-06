import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  Dimensions,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../config/firebase";
import { styles } from "../styles";
import { Card } from "react-native-elements";
import CustomButton from "./CustomButton";

const Notifications = ({ route }) => {
  console.log("Received username in Notifications:", route.username);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [daysBeforeEvent, setDaysBeforeEvent] = useState("");
  const { username } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", username));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setIsNotificationOn(userData.notificationsEnabled || false);
            setDaysBeforeEvent(userData.daysBeforeEvent || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [username]); // Dependency array

  const toggleSwitch = () =>
    setIsNotificationOn((previousState) => !previousState);
  const handleSubmit = async () => {
    Keyboard.dismiss();
    const data = {
      notificationsEnabled: isNotificationOn,
      daysBeforeEvent: daysBeforeEvent,
    };

    try {
      if (username) {
        console.log(username);
        username.trim();
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref; // Getting the reference of the first document
          await updateDoc(userDocRef, data);
          alert("Settings updated for user!");
        } else {
          console.log("No user found");
        }
      }
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      alert(`Error: ${error.message}`);
    }
  };

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View
      style={{
        ...styles.grayContainer,
        marginTop: marginTopAmnt,
      }}
    >
      <Text style={styles.pageHeader}>Notification Settings</Text>
      <Card containerStyle={[styles.cardContainer]}>
        <View style={[styles.setting, { marginBottom: -1 }]}>
          <Text style={[styles.cardHeader, { fontSize: 18 }]}>
            Allow Notifications
          </Text>
          <Switch onValueChange={toggleSwitch} value={isNotificationOn} />
        </View>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.setting}>
          <Text style={[styles.cardHeader, { fontSize: 16 }]}>Notify me </Text>
          <TextInput
            style={styles.input}
            onChangeText={setDaysBeforeEvent}
            value={daysBeforeEvent}
            placeholder="Number of days"
            keyboardType="numeric"
            editable={isNotificationOn}
            width="13%"
          />
          <Text style={[styles.cardHeader, { fontSize: 16 }]}>
            days before every gift
          </Text>
        </View>
        <CustomButton title="Save Settings" onPress={handleSubmit} />
      </Card>
    </View>
  );
};

export default Notifications;
