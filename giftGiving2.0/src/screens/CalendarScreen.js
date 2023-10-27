import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const dotColor = "blue"; // You can specify your desired dot color

  // Function to toggle the dot on the selected date
  const toggleDotOnSelectedDate = () => {
    if (selectedDate) {
      if (markedDates[selectedDate]) {
        // The selected date already has a dot, so remove it
        const { [selectedDate]: removedDot, ...remainingDates } = markedDates;
        setMarkedDates(remainingDates);
      } else {
        // The selected date does not have a dot, so add one
        setMarkedDates({
          ...markedDates,
          [selectedDate]: {
            selected: true,
            marked: true,
            dotColor,
          },
        });
      }
    }
  };

  // Handle date press and set the selectedDate
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    toggleDotOnSelectedDate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>Calendar</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  pageHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  calendarContainer: {
    paddingVertical: 20,
  },
});

export default CalendarScreen;
