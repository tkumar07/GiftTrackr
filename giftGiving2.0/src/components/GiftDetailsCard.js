import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { styles } from "../styles";

const GiftDetailsCard = ({
  recipient,
  date,
  occasion,
  budget,
  likes,
  dislikes,
  decidedGift,
}) => {
  const formatDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp); // Convert to milliseconds
    return dateObject.toDateString();
  };

  const formattedDate = formatDate(date);

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
    </Card>
  );
};

export { GiftDetailsCard };
