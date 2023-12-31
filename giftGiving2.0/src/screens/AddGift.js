import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";

function AddGift({ navigation, route }) {
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [decidedGift, setDecidedGift] = useState("");
  const { username } = route.params; // Added to get the username from the navigation route

  const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01]).\d{4}$/;
    return regex.test(dateString);
  };

  const saveData = async () => {
    if (!recipient || !date || !isValidDate(date)) {
      Alert.alert(
        "Error",
        "Recipient and a valid date (MM/DD/YYYY) are required."
      );
      return;
    }

    const [month, day, year] = date.split(".").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    if (
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year === currentYear && month < currentMonth) ||
      (year === currentYear && month === currentMonth && day < currentDay)
    ) {
      Alert.alert("Error", "Please enter a valid date after today.");
      return;
    }

    //Convert date to unix timestamp
    const [monthIndex, dayIndex, yearIndex] = date.split(".").map(Number);
    const timestamp = new Date(yearIndex, monthIndex - 1, dayIndex).getTime();

    const giftData = {
      recipient,
      date: timestamp,
      occasion,
      budget,
      likes,
      dislikes,
      decidedGift,
    };

    const db = getFirestore();

    try {
      const giftRef = await addDoc(collection(db, "gifts"), giftData);
      const giftId = giftRef.id;
      giftData.id = giftId;

      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("username", "==", username));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        const userGiftIDs = userData.gifts || [];
        userGiftIDs.push(giftId);

        const userDocRef = doc(db, "users", userQuerySnapshot.docs[0].id);
        await setDoc(userDocRef, { gifts: userGiftIDs }, { merge: true });
      }

      setRecipient("");
      setDate("");
      setOccasion("");
      setBudget("");
      setLikes("");
      setDislikes("");
      setDecidedGift("");

      navigation.navigate("Home", { newGift: giftData });
    } catch (error) {
      console.error("Error saving gift data: ", error);
    }
  };

  const screenHeight = Dimensions.get("window").height;
  let marginTopAmnt = screenHeight * 0.09;

  if (marginTopAmnt > 75) {
    marginTopAmnt = 75;
  }
  return (
    <View
      style={{
        ...styles.grayContainer,
        marginTop: marginTopAmnt,
      }}
    >
      <ScrollView width="100%">
        <Text style={styles.pageHeader}>Add a Gift</Text>
        <TextInput
          style={styles.input}
          placeholder="Recipient"
          value={recipient}
          onChangeText={(text) => setRecipient(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date (MM.DD.YYYY)"
          value={date}
          onChangeText={(text) => {
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
        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <CustomButton title="Save" onPress={saveData} />
        </View>
      </ScrollView>
    </View>
  );
}

export default AddGift;
