import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import BudgetSection from "../components/BudgetSection";  // Import the BudgetSection

function HomeScreen({ navigation }) {
  const [totalBudget, setTotalBudget] = useState(1000);  // Default budget
  const [amountSpent, setAmountSpent] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Home Screen</Text>
      
      {/* Display Budget Section */}
      <BudgetSection totalBudget={totalBudget} amountSpent={amountSpent} />

      <Text>Set Your Budget:</Text>
      <TextInput 
        style={styles.input} 
        value={totalBudget.toString()} 
        onChangeText={(value) => setTotalBudget(Number(value))}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Add Gift")}
        >
          <Text style={styles.buttonText}>Go to Add Gift Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Calendar")}
        >
          <Text style={styles.buttonText}>Go to Calendar Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 24,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%"
  }
};

export default HomeScreen;
