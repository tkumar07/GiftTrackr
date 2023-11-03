import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { styles } from "../styles";
import CustomButton from "../components/CustomButton";

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventNames, setEventNames] = useState({});
  const [newEventName, setNewEventName] = useState("");
  const dotColor = '#C6E9F7';

  const events = {};

  useEffect(() => {
    const initialMarkedDates = {};
    for (const date in events) {
      initialMarkedDates[date] = {
        selected: true,
        marked: true,
        dotColor,
      };
    }
    setMarkedDates(initialMarkedDates);
  }, []);

  const handleDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);
    setNewEventName(eventNames[date] || "");
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      const updatedEventNames = { ...eventNames };
      updatedEventNames[selectedDate] = newEventName;
      setEventNames(updatedEventNames);

      // Show a small blue dot underneath the selected date
      setMarkedDates((prevMarkedDates) => ({
        ...prevMarkedDates,
        [selectedDate]: {
          ...prevMarkedDates[selectedDate],
          selected: true,
          marked: true,
          dotColor,
        },
      }));
    }
  };

  const handleRemoveEvent = () => {
    if (selectedDate) {
      const updatedEventNames = { ...eventNames };
      delete updatedEventNames[selectedDate];
      setEventNames(updatedEventNames);

      // Remove the dot from the selected date
      setMarkedDates((prevMarkedDates) => {
        const updatedMarkedDates = { ...prevMarkedDates };
        if (updatedMarkedDates[selectedDate]) {
          delete updatedMarkedDates[selectedDate];
        }
        return updatedMarkedDates;
      });
    }
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
        <Calendar style={{
          borderColor: '#C6E9F7',
          backgroundColor: '#C6E9F7',
        }}

  markedDates={markedDates} onDayPress={handleDayPress} enableSwipeMonths={true} />
      </View>
      {selectedDate && (
        <View style={unique_styles.agendaContainer}>
          <Text style={unique_styles.dateText}>
            {moment(selectedDate).format("MMMM D, YYYY")}
          </Text>
          {eventNames[selectedDate] && (
            <Text style={unique_styles.eventName}>{eventNames[selectedDate]}</Text>
          )}
          {eventNames[selectedDate] ? (
            <CustomButton title="Remove Event" onPress={handleRemoveEvent}/>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Event Name"
                value={newEventName}
                onChangeText={(text) => setNewEventName(text)}
              />
              <CustomButton title="Add Event" onPress={handleAddEvent}/>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const unique_styles = StyleSheet.create({
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
  agendaContainer: {
    padding: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    marginBottom: 10,
  },
  customButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  eventInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 8,
  },
});

export default CalendarScreen;
