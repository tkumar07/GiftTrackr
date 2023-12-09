import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
} from "react-native";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";

function EditGift({ giftData, onClose, username }) {
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [likes, setLikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [decidedGift, setDecidedGift] = useState("");

  const formatUnixTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date
      .getDate()
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
    return formattedDate;
  };

  useEffect(() => {
    if (giftData) {
      setRecipient(giftData.recipient || "");
      setDate(formatUnixTimestamp(giftData.date));
      setOccasion(giftData.occasion || "");
      setBudget(giftData.budget ? giftData.budget.toString() : "");
      setLikes(giftData.likes || "");
      setDislikes(giftData.dislikes || "");
      setDecidedGift(giftData.decidedGift || "");
    }
  }, [giftData]);

  const saveData = async () => {
    console.log("Save Data Pressed");

    const currentDate = new Date();
    const [month, day, year] = date.split(".").map(Number);
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const [monthIndex, dayIndex, yearIndex] = date.split(".").map(Number);
    const timestamp = new Date(yearIndex, monthIndex - 1, dayIndex).getTime();

    const updatedGiftData = {
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
      if (giftData.id) {
        const giftDocRef = doc(db, "gifts", giftData.id);
        await updateDoc(giftDocRef, updatedGiftData);
      } else {
        const giftRef = await addDoc(collection(db, "gifts"), updatedGiftData);
        const giftId = giftRef.id;
        updatedGiftData.id = giftId;

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
      }
      console.log("Gift saved successfully!");

      setRecipient("");
      setDate("");
      setOccasion("");
      setBudget("");
      setLikes("");
      setDislikes("");
      setDecidedGift("");

      console.log("Calling onClose..");
      onClose();
    } catch (error) {
      console.error("Error saving gift data: ", error);
      Alert.alert("Error", "There was an issue saving the gift.");
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
        <Text style={styles.pageHeader}>Update Gift Details</Text>
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

export default EditGift;
