import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-elements";
import { styles } from "../styles";
import { deleteDoc } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFirestore, doc } from "firebase/firestore";

const GiftDetailsCard = ({
  recipient,
  date,
  occasion,
  budget,
  likes,
  dislikes,
  decidedGift,
  id,
  updateGifts,
  navigation,
}) => {
  const [suggestedGifts, setSuggestedGifts] = useState([]);

  useEffect(() => {
    // console.log("useEffect triggered");
    fetchSuggestedGifts(occasion, budget, likes);
  }, [occasion, budget, likes]);

  const formatDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);
    return dateObject.toDateString();
  };

  const formattedDate = formatDate(date);

  const handleDelete = async (id) => {
    Alert.alert("Delete Gift", "Are you sure you want to delete this gift?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const db = getFirestore();
          const giftRef = doc(db, "gifts", id);

          try {
            await deleteDoc(giftRef);
            updateGifts();
          } catch (error) {
            console.log("Error deleting gift: ", error);
          }
        },
      },
    ]);
  };

  const fetchSuggestedGifts = async (occasion, budget, likes) => {
    const prompt = `Suggest a gift for a ${occasion},budget of ${budget} where the likes are ${likes}`;

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 30,
      }),
    });

    const data = await response.json();
    // console.log("API Response:", data);
    const suggestedGiftsArray = data.choices[0].text
      .split("\n")
      .filter((item) => item.trim() !== "");

    setSuggestedGifts(suggestedGiftsArray);
  };

  const handleEdit = (id) => {
    navigation.navigate("EditGift", {
      giftData: {
        recipient,
        date,
        occasion,
        budget,
        likes,
        dislikes,
        decidedGift,
        id,
      },
      updateGifts,
      navigation,
    });
  };

  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.subtitle}>{recipient}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.text}>{occasion}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.box}>
          <View>
            <Text style={styles.decidedGiftText}>Planning to Give:</Text>
            <Text style={styles.text}>{decidedGift}</Text>
          </View>
          <View style={styles.budgetBox}>
            <Text style={styles.budgetText}>Budget:</Text>
            <Text style={styles.text}>{budget}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.twoColumnContainer}>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Likes</Text>
            <Text style={styles.text}>{likes}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.columnTitle}>Dislikes</Text>
            <Text style={styles.text}>{dislikes}</Text>
          </View>
        </View>
        <View style={[styles.setting, { marginTop: 10, marginBottom: -1 }]}>
          <View style={[{ marginTop: -9 }]}>
            <TouchableOpacity
              onPress={() => handleEdit(id)}
              style={styles.editButton}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={[{ marginTop: 24, marginRight: 15 }]}>
            <TouchableOpacity
              onPress={() => handleDelete(id)}
              style={styles.deleteButton}
            >
              <MaterialCommunityIcons name="delete" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.suggestedGiftsContainer}>
        <Text style={styles.suggestedGiftsTitle}>Suggested Gift:</Text>
        {suggestedGifts.length > 0 ? (
          suggestedGifts.map((gift, index) => (
            <Text key={index} style={styles.suggestedGift}>
              {gift}
            </Text>
          ))
        ) : (
          <Text style={styles.noSuggestionsText}>No suggestions available</Text>
        )}
      </View>
    </Card>
  );
};

export { GiftDetailsCard };
