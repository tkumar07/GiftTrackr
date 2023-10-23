import React from "react";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../styles";

function BudgetScreen() {
  const [totalBudget, setTotalBudget] = useState(1000); // Default budget
  const [amountSpent, setAmountSpent] = useState(0);
  const amountRemaining = totalBudget - amountSpent;

  return (
    <View style={styles.container}>
      <Text>Budget Screen</Text>
      <View style={styles.container}>
        <Text>Total Budget: ${totalBudget}</Text>
        <Text>Amount Spent: ${amountSpent}</Text>
        <Text>Amount Remaining: ${amountRemaining}</Text>
      </View>

      <Text>Set Your Budget:</Text>
      <TextInput
        style={styles.input}
        value={totalBudget.toString()}
        onChangeText={(value) => setTotalBudget(Number(value))}
        keyboardType="numeric"
      />
    </View>
  );
}

export default BudgetScreen;
