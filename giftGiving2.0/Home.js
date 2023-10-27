import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { GiftDetailsCard } from "./src/components/GiftDetailsCard";
import { styles } from "./src/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
  const [giftCards, setGiftCards] = useState([]);

  useEffect(() => {
    // Fetch the gift card data from AsyncStorage when the component mounts
    async function fetchGiftCards() {
      const savedGiftData = await AsyncStorage.getItem('giftData');
      if (savedGiftData) {
        const parsedGiftData = JSON.parse(savedGiftData);
        setGiftCards(parsedGiftData);
      }
    }
    fetchGiftCards();
  }, []);

  const handleDelete = async (index) => {
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
            // Remove the selected gift card from the state
            const updatedGiftCards = [...giftCards];
            updatedGiftCards.splice(index, 1);
            setGiftCards(updatedGiftCards);

            // Update the data in AsyncStorage
            await AsyncStorage.setItem('giftData', JSON.stringify(updatedGiftCards));
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
            onPress={() => handleDelete(index)}
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
