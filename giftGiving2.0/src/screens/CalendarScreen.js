import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { styles } from "../styles";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import { db } from "../config/firebase";
import { useFocusEffect } from "@react-navigation/native";
import { SimplifiedCard } from "../components/SimplifiedCard";
import { ScrollView } from "react-native";

const CalendarScreen = (props) => {
  const { username } = props.route.params;
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [giftDetails, setGiftDetails] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchDates();
    }, [props.route.params.username])
  );

  const fetchDates = async () => {
    try {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("username", "==", username));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const markedDatesData = {};

        for (const userDoc of userQuerySnapshot.docs) {
          const userData = userDoc.data();
          const userGiftIDs = userData.gifts || [];

          for (const giftID of userGiftIDs) {
            const giftRef = doc(db, "gifts", giftID);
            const giftDoc = await getDoc(giftRef);

            if (giftDoc.exists()) {
              const date = moment(giftDoc.data().date).format("YYYY-MM-DD");
              markedDatesData[date] = {
                selected: true,
                marked: true,
                dotColor: "#C6E9F7",
              };
            }
          }
        }

        setMarkedDates(markedDatesData);
        console.log("Dates fetched successfully");
      } else {
        console.log("No gifts found");
      }
    } catch (error) {
      console.error("Error fetching dates: ", error);
    }
  };

  const handleDayPress = async (day) => {
    const date = moment(day.dateString).format("YYYY-MM-DD"); // Format consistently
    setSelectedDate(date);

    try {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("username", "==", username));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const selectedGiftDetails = [];

        for (const userDoc of userQuerySnapshot.docs) {
          const userData = userDoc.data();
          const userGiftIDs = userData.gifts || [];

          for (const giftID of userGiftIDs) {
            const giftRef = doc(db, "gifts", giftID);
            const giftDoc = await getDoc(giftRef);

            if (giftDoc.exists()) {
              const giftDate = moment(giftDoc.data().date).format("YYYY-MM-DD");

              if (giftDate === date) {
                selectedGiftDetails.push({
                  recipient: giftDoc.data().recipient,
                  date: giftDate,
                  occasion: giftDoc.data().occasion,
                });
              }
            }
          }
        }

        setGiftDetails(selectedGiftDetails);
      }
    } catch (error) {
      console.error("Error fetching gift details: ", error);
    }
  };

  const renderGiftCards = () => {
    return (
      <View>
        {giftDetails.map((gift, index) => (
          <SimplifiedCard
            key={index}
            recipient={gift.recipient}
            date={gift.date}
            occasion={gift.occasion}
            likes={gift.likes}
            dislikes={gift.dislikes}
          />
        ))}
      </View>
    );
  };

  const formatDateForDisplay = (date) => {
    return moment(date).format("MMMM D, YYYY");
  };

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <ScrollView>
      <View style={[styles.grayContainer, { marginTop: marginTopAmnt }]}>
        <Text style={styles.pageHeader}>Calendar</Text>
        <View style={{ paddingVertical: 0, width: "96%" }}>
          <Calendar
            style={{
              borderColor: "#C6E9F7",
              backgroundColor: "#C6E9F7",
            }}
            markedDates={markedDates}
            onDayPress={handleDayPress}
            enableSwipeMonths={true}
          />
        </View>
        {selectedDate && (
          <View style={unique_styles.dateContainer}>
            <Text style={unique_styles.dateText}>
              {formatDateForDisplay(selectedDate)}
            </Text>
          </View>
        )}
        {selectedDate && giftDetails && renderGiftCards()}
      </View>
    </ScrollView>
  );
};

const unique_styles = StyleSheet.create({
  dateContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CalendarScreen;
