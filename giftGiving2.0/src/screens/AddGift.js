import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddGift({ navigation }) {
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [decidedGift, setDecidedGift] = useState("");

  const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(dateString);
  };

  const saveData = async () => {
    if (!recipient || !date || !isValidDate(date)) {
      Alert.alert("Error", "Recipient and a valid date (MM/DD/YYYY) are required.");
      return;
    }

    const giftData = {
      recipient,
      date,
      occasion,
      budget,
      likes,
      dislikes,
      decidedGift,
    };

    try {
      // Get existing gift data from AsyncStorage
      const existingGiftData = await AsyncStorage.getItem('giftData');
      const parsedData = JSON.parse(existingGiftData) || [];

      // Add the new gift data to the existing data
      parsedData.push(giftData);

      // Store the updated data back in AsyncStorage
      await AsyncStorage.setItem('giftData', JSON.stringify(parsedData));

      // Clear input fields
      setRecipient("");
      setDate("");
      setOccasion("");
      setBudget("");
      setLikes("");
      setDislikes("");
      setDecidedGift("");

      // Navigate back to the home page
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error saving gift data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add a Gift</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient"
        value={recipient}
        onChangeText={(text) => setRecipient(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (MM/DD/YYYY)"
        value={date}
        onChangeText={(text) => {
          if (text.length === 2 || text.length === 5) {
            text += "/";
          }
          setDate(text);
        }}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Occasion"
        value={occasion}
        onChangeText={(text) => setOccasion(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget"
        value={budget}
        onChangeText={(text) => setBudget(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Likes"
        value={likes}
        onChangeText={(text) => setLikes(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dislikes"
        value={dislikes}
        onChangeText={(text) => setDislikes(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Decided Gift"
        value={decidedGift}
        onChangeText={(text) => setDecidedGift(text)}
      />
      <Button title="Save" onPress={saveData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default AddGift;
