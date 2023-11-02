import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

function BudgetScreen() {
  // 1. Initialize budget to 0
  const [totalBudget, setTotalBudget] = useState(0);
  const [amountSpent, setAmountSpent] = useState(0); // assuming this might be used

  // Dummy function to represent fetching gift data
  const getGiftDataCost = () => {
    // Placeholder value for now. In a real scenario, fetch the actual data.
    return 50;
  };

  const updateBudget = () => {
    let giftCost = getGiftDataCost();
    setTotalBudget(totalBudget - giftCost);
  };

  return (
    <View>
      <Text>Budget Screen</Text>

      <Text>Set Your Budget:</Text>
      <TextInput
        style={styles.input}
        value={totalBudget.toString()}
        onChangeText={(value) => setTotalBudget(Number(value))}
        keyboardType="numeric"
      />

      {/* 4. Message if Budget is 0 */}
      {totalBudget === 0 && <Text>Please set your budget!</Text>}

      <Button title="Update Budget with Gift Data" onPress={updateBudget} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default BudgetScreen;
