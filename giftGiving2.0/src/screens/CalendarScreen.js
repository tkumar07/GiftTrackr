import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { styles } from "../styles";

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

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View
      style={{
        ...styles.grayContainer,
        marginTop: marginTopAmnt,
      }}
    >
      <Text style={styles.pageHeader}>Calendar</Text>
      <View style={{ paddingVertical: 0, width: "100%" }}>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      </View>
    </View>
  );
};

export default CalendarScreen;
