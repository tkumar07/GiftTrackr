import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import moment from "moment";
import { styles as sharedStyles } from "../styles"; // Assuming this is the shared styles

const GiftHistoryCard = ({
  recipient,
  date,
  occasion,
  budget,
  decidedGift,
  likes,
  dislikes,
}) => {
  const formatDate = (unixTimestamp) => {
    const dateObject = new Date(unixTimestamp);
    return dateObject.toDateString();
  };
  
  const formattedDate = formatDate(date);

  return (
    <Card containerStyle={sharedStyles.cardContainer}>
      <View style={sharedStyles.cardHeader}>
        <Text style={sharedStyles.subtitle}>{recipient}</Text>
        <Text style={sharedStyles.date}>{formattedDate}</Text>
      </View>
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.text}>Occasion: {occasion}</Text>
        <Text style={sharedStyles.text}>Gift: {decidedGift}</Text>
        <View style={sharedStyles.box}>
          <Text style={sharedStyles.budgetText}>Budget: {budget}</Text>
        </View>
        <View style={sharedStyles.twoColumnContainer}>
          <View style={sharedStyles.column}>
            <Text style={sharedStyles.columnTitle}>Likes</Text>
            <Text style={sharedStyles.text}>{likes}</Text>
          </View>
          <View style={sharedStyles.column}>
            <Text style={sharedStyles.columnTitle}>Dislikes</Text>
            <Text style={sharedStyles.text}>{dislikes}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default GiftHistoryCard;
