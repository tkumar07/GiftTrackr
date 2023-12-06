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
import { Card } from "react-native-elements";

function BudgetScreen(props) {
  const { username } = props.route.params;
  const [budget, setBudget] = useState("0");
  const [updatedBudget, setUpdatedBudget] = useState("0");
  const [spentAmount, setSpentAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [userId, setUserId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setUpdatedBudget(
        userData.totalBudget ? userData.totalBudget.toString() : "0"
      );
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

    const budgetValue = parseFloat(updatedBudget);

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

        setBudget(updatedBudget);

        setSuccessMessage("Budget updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Error updating budget in Firestore:", error);
        Alert.alert("Failed to update budget. Please try again.");
      }
    }
  };

  const remainingBudget = parseFloat(budget) - spentAmount;
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const widthInPixels = `${screenWidth * 0.9}px`;
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
      <Text style={styles.pageHeader}>Budget</Text>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.bigText}>${remainingBudget.toFixed(2)}</Text>
        </View>
        <View style={styles.cardContent}>
          {remainingBudget < 0 ? (
            <Text style={styles.text}>
              Oh no! You went over budget. Please adjust your upcoming gift
              costs or update your budget.
            </Text>
          ) : (
            <Text style={styles.text}>
              {"  "}
              remaining to spend on your loved ones
            </Text>
          )}
          <Text style={styles.text}> </Text>
          <Text style={styles.text}> </Text>
          <Text style={styles.subtitle}>Your Gift Giving Budget:</Text>
          {/* <Text style={[styles.text, { fontSize: "18" }]}>
            {" "}
            ${spentAmount.toFixed(2)}
          </Text> */}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.subtitle, { fontSize: "26", width: "10%" }]}>
            $
          </Text>
          <TextInput
            width={widthInPixels}
            value={updatedBudget ? parseFloat(updatedBudget).toFixed(2) : ""}
            onChangeText={(text) => {
              if (!text || !isNaN(text)) {
                setUpdatedBudget(text);
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
        </View>

        {parseFloat(budget) === 0 && (
          <Text style={styles.encouragementText}>
            Please create your first budget!
          </Text>
        )}

        <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
          <CustomButton title="Update Budget" onPress={handleUpdateBudget} />
          {successMessage ? <Text>{successMessage}</Text> : null}
        </View>
      </Card>
    </View>
  );
}

export default BudgetScreen;
