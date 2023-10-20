// src/components/BudgetSection.js
import React from 'react';
import { View, Text } from 'react-native';

const BudgetSection = ({ totalBudget, amountSpent }) => {
  const amountRemaining = totalBudget - amountSpent;

  return (
    <View style={styles.container}>
      <Text>Total Budget: ${totalBudget}</Text>
      <Text>Amount Spent: ${amountSpent}</Text>
      <Text>Amount Remaining: ${amountRemaining}</Text>
    </View>
  );
}

const styles = {
  container: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
};

export default BudgetSection;