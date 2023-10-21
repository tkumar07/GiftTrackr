import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

const BudgetSection = ({ totalBudget, amountSpent }) => {
  const amountRemaining = totalBudget - amountSpent;

  return (
    <View style={styles.container}>
      <Text>Total Budget: ${totalBudget}</Text>
      <Text>Amount Spent: ${amountSpent}</Text>
      <Text>Amount Remaining: ${amountRemaining}</Text>
    </View>
  );
};

export default BudgetSection;
