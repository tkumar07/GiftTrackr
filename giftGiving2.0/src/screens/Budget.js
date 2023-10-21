import React from "react";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { BudgetSection } from "../components/BudgetSection";
import { styles } from "../styles";

function Budget() {
  const [totalBudget, setTotalBudget] = useState(1000); // Default budget
  const [amountSpent, setAmountSpent] = useState(0);

  return (
    <View>
      <Text>Budget Screen</Text>
      <BudgetSection totalBudget={totalBudget} amountSpent={amountSpent} />

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

export default Budget;
