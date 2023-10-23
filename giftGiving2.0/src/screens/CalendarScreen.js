import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Calendar />
    </View>
  );
};

export default CalendarScreen;
