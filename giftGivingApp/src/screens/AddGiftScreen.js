import React from "react";
import { View, Text } from "react-native";

function AddGiftScreen() {
  return (
    <View style={styles.container}>
      <Text>this screen is for adding a gift</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AddGiftScreen;
