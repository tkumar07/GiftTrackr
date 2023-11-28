import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, Keyboard} from 'react-native';
import { collection, query, where, getDocs, updateDoc } from "@firebase/firestore";
import { db } from "../config/firebase";


const Notifications = ({route}) => {
  console.log("Received username in Notifications:", route.username);
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [daysBeforeEvent, setDaysBeforeEvent] = useState('');
  const {username} = route.params;

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
            setDaysBeforeEvent(userData.daysBeforeEvent || '');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [username]); // Dependency array


  const toggleSwitch = () => setIsNotificationOn(previousState => !previousState);
  const handleSubmit = async () => {

    Keyboard.dismiss();
    const data = {
      notificationsEnabled: isNotificationOn,
      daysBeforeEvent: daysBeforeEvent
    };
  
    try {
      if(username){
        console.log(username)
        username.trim()
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref; // Getting the reference of the first document
          await updateDoc(userDocRef, data);
          alert('Settings updated for user!');
        } else {
          console.log("No user found")
        }
      }
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.setting}>
        <Text style={styles.label}>Notifications:</Text>
        <Switch
          onValueChange={toggleSwitch}
          value={isNotificationOn}
        />
      </View>
      <View style={styles.setting}>
        <Text style={styles.label}>Notify me </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDaysBeforeEvent}
          value={daysBeforeEvent}
          placeholder="Number of days"
          keyboardType="numeric"
          editable={isNotificationOn}
        />
      </View>
      <Button title="Save Settings" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    width: 100,
  },
});

export default Notifications;