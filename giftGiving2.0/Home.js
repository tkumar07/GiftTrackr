import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { GiftDetailsCard } from "./src/components/GiftDetailsCard";
import { styles } from "./src/styles";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function HomeScreen({ route, navigation }) {
  const [giftCards, setGiftCards] = useState([]);

  useEffect(() => {
    // Fetch the gift card data from Firestore when the component mounts
    const db = getFirestore();

    async function fetchGiftCards() {
      const giftsCollection = collection(db, "gifts");
      const querySnapshot = await getDocs(giftsCollection);

      const giftData = [];
      querySnapshot.forEach((doc) => {
        giftData.push({ id: doc.id, ...doc.data() });
      });

      setGiftCards(giftData);
    }

    fetchGiftCards();

    // Check if a new gift was added (passed from AddGift.js) and add it to the state
    if (route.params && route.params.newGift) {
      const newGift = route.params.newGift;
      setGiftCards((gifts) => [...gifts, newGift]);
    }
  }, [route.params]);

  const handleDelete = async (id) => {
    // Display a confirmation alert before deleting
    Alert.alert(
      "Delete Gift",
      "Are you sure you want to delete this gift?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const db = getFirestore();
            const giftRef = doc(db, "gifts", id);

            // Delete the selected gift card from Firestore
            await deleteDoc(giftRef);

            // Remove the deleted gift card from the state
            setGiftCards(giftCards.filter((gift) => gift.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={{ ...styles.container, marginTop: 10 }}>
      <Text style={styles.pageHeader}>Upcoming Gifts:</Text>
      {giftCards.map((giftCard, index) => (
        <View key={index}>
          <GiftDetailsCard
            recipient={giftCard.recipient}
            date={giftCard.date}
            occasion={giftCard.occasion}
            budget={giftCard.budget}
            likes={giftCard.likes}
            dislikes={giftCard.dislikes}
            decidedGift={giftCard.decidedGift}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(giftCard.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddGift')}
      >
        <Text style={styles.addButtonText}>Add Gift</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
