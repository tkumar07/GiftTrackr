import React from "react";
import { View, Text } from "react-native";
function HomeScreen() {
  return (
    <View styles={styles.container}>
      <Text>Home Screen</Text>
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
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: "80%",
  },
};

export default HomeScreen;
