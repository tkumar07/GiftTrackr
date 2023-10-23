import React from "react";
import { Text, View, StyleSheet } from "react-native";

const GiftCard = ({ recipient, date, occasion, gift }) => {
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recipient: {
    fontWeight: "bold",
    fontSize: 24,
  },
  occasion: {
    fontSize: 16,
  },
  gift: {
    fontSize: 16,
  },
});

export default GiftCard;
