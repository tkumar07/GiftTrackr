import React from "react";
import { View, text } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Calendar/>
    </View>
  );
};


const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default CalendarScreen;
