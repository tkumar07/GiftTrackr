import React, { useState } from 'react';
import { View, TextInput, Text, Button, Alert } from 'react-native';
import { collection, query, where, getDocs, addDoc } from '@firebase/firestore';
import { db } from "../config/firebase"

const SignUp  = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    try {
        if(password != passwordConf){
            Alert("Passwords do not match")
        }

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            Alert("Username Exists, try another")
        } else {
          await addDoc(usersRef, {
            username: username,
            password: password,
            gifts: [],
            totalBudget: 0
          });
          
          Alert.alert("Success", "Account created successfully!");

          if (props && props.onSuccessfulSignUp) {
            props.onSuccessfulSignUp();
          }
        }
    } catch (error) {
      console.error("Error signing up: ", error);
      Alert.alert("Error", "An error occurred during sign up");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Text>
        SIGN UP
      </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter username"
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
      />
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={setPasswordConf}
        value={passwordConf}
        placeholder="Confirm password"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default SignUp;