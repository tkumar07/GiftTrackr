import React from "react";
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
}) => {
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
      </View>

      <TouchableOpacity
        onPress={() => handleDelete(id)}
        style={styles.deleteButton}
      >
        <MaterialCommunityIcons name="delete" size={24} color="gray" />
      </TouchableOpacity>
    </Card>
  );
};

export { GiftDetailsCard };
