import React from "react";
import { View, Text } from "react-native";

function BudgetScreen() {
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

export default BudgetScreen;
