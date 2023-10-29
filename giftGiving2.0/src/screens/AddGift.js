import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getFirestore, addDoc, collection } from "firebase/firestore";

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

    // Parse the date string into separate components (month, day, year)
    const [month, day, year] = date.split('/').map(Number);

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based
    const currentDay = currentDate.getDate();

    if (month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth) || 
      (year === currentYear && month === currentMonth && day < currentDay)) {
      Alert.alert("Error", "Please enter a valid date.");
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

    const db = getFirestore();

    try {
      // Add a new document to the "gifts" collection in Firestore
      const giftRef = await addDoc(collection(db, "gifts"), giftData);

      // Get the document ID and add it to the gift data
      giftData.id = giftRef.id;

      // Clear input fields
      setRecipient("");
      setDate("");
      setOccasion("");
      setBudget("");
      setLikes("");
      setDislikes("");
      setDecidedGift("");

      // Navigate back to the home page, passing the gift data
      navigation.navigate('Home', { newGift: giftData });
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
