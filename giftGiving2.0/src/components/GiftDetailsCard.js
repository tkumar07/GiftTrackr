import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { styles } from "../styles";

const GiftDetailsCard = ({ recipient, date, occasion, gift }) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.subtitle}>{recipient}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.text}>{occasion}</Text>
        <Text style={styles.gift}>gifting: {gift}</Text>
      </View>
    </Card>
  );
};

export { GiftDetailsCard };
