import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Keyboard,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";

function BudgetScreen(props) {
  const { username } = props.route.params;
  const [budget, setBudget] = useState("0");
  const [spentAmount, setSpentAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchUserGifts();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToGiftChanges();
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId]);

  const fetchUserGifts = async () => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const userQuery = query(usersRef, where("username", "==", username));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      setUserId(userDoc.id);
      const userData = userDoc.data();
      setBudget(userData.totalBudget ? userData.totalBudget.toString() : "0");
    }
  };

  const listenToGiftChanges = () => {
    if (!userId) return;

    const db = getFirestore();
    const userRef = doc(db, "users", userId);

    return onSnapshot(userRef, async (doc) => {
      const userData = doc.data();
      const userGiftIDs = userData.gifts || [];

      if (userGiftIDs.length === 0) {
        console.log("No gifts found for the user.");
        setSpentAmount(0);
        return;
      }

      let totalSpent = 0;

      const giftRef = collection(db, "gifts");
      const giftQuery = query(giftRef, where("__name__", "in", userGiftIDs));
      const giftDocsSnapshot = await getDocs(giftQuery);

      if (giftDocsSnapshot.empty) {
        console.log("No gift documents matched the query.");
        setSpentAmount(0);
        return;
      }

      giftDocsSnapshot.forEach((giftDoc) => {
        const giftBudget = parseFloat(giftDoc.data().budget) || 0;
        console.log(`Gift ID: ${giftDoc.id}, Budget: ${giftBudget}`);
        totalSpent += giftBudget;
      });

      console.log(`Total Spent (calculated): ${totalSpent}`);
      setSpentAmount(totalSpent);
    });
  };

  const handleUpdateBudget = async () => {
    Keyboard.dismiss();

    if (!userId) {
      Alert.alert("Error fetching user information. Please try again.");
      return;
    }

    const budgetValue = parseFloat(budget);

    if (isNaN(budgetValue) || budgetValue < 0) {
      setIsError(true);
      return;
    } else {
      setIsError(false);

      try {
        const db = getFirestore();
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          totalBudget: budgetValue,
        });

        Alert.alert("Budget updated successfully!");
      } catch (error) {
        console.error("Error updating budget in Firestore:", error);
        Alert.alert("Failed to update budget. Please try again.");
      }
    }
  };

  const remainingBudget = parseFloat(budget) - spentAmount;

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View
      style={{
        ...styles.grayContainer,
        marginTop: marginTopAmnt,
      }}
    >
      <Text style={styles.pageHeader}>Budget</Text>
      <TextInput
        value={budget}
        onChangeText={(text) => {
          if (!text || !isNaN(text)) {
            setBudget(text);
          }
        }}
        placeholder="Enter your budget"
        keyboardType="numeric"
        style={{
          height: 40,
          borderColor: isError ? "red" : "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          width: "80%",
        }}
      />
      <Text>Total Spent: ${spentAmount.toFixed(2)}</Text>
      <Text>Remaining Budget: ${remainingBudget.toFixed(2)}</Text>
      {parseFloat(budget) === 0 && (
        <Text style={styles.encouragementText}>
          Please create your first budget!
        </Text>
      )}
      <Button title="Update Budget" onPress={handleUpdateBudget} />
    </View>
  );
}

export default BudgetScreen;
