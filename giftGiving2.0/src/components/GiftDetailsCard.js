import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { styles } from "../styles";

const GiftDetailsCard = ({ recipient, date, occasion, gift }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.recipient}>{recipient}</Text>
        <Text>{date}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.occasion}>{occasion}</Text>
        <Text style={styles.gift}>gifting: {gift}</Text>
      </View>
    </View>
  );
};

export { GiftDetailsCard };
