import React from "react";
import { View, Text } from "react-native";

function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text>calendar screen</Text>
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

export default CalendarScreen;
