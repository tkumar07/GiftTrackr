import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventNames, setEventNames] = useState({});
  const [newEventName, setNewEventName] = useState("");
  const dotColor = "blue";

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

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>Calendar</Text>
      <View style={styles.calendarContainer}>
        <Calendar markedDates={markedDates} onDayPress={handleDayPress} />
      </View>
      {selectedDate && (
        <View style={styles.agendaContainer}>
          <Text style={styles.dateText}>
            {moment(selectedDate).format("MMMM D, YYYY")}
          </Text>
          {eventNames[selectedDate] && (
            <Text style={styles.eventName}>{eventNames[selectedDate]}</Text>
          )}
          {eventNames[selectedDate] ? (
            <TouchableOpacity
              style={[styles.customButton, { backgroundColor: "red" }]}
              onPress={handleRemoveEvent}
            >
              <Text style={styles.buttonText}>Remove Event</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TextInput
                style={styles.eventInput}
                placeholder="Event name"
                value={newEventName}
                onChangeText={(text) => setNewEventName(text)}
              />
              <TouchableOpacity
                style={[styles.customButton, { backgroundColor: "green" }]}
                onPress={handleAddEvent}
              >
                <Text style={styles.buttonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

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
  agendaContainer: {
    padding: 16,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
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
