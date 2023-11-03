import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { GiftDetailsCard } from "./src/components/GiftDetailsCard";
import { styles } from "./src/styles";
import { db } from "./src/config/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

function HomeScreen(props) {
  const { username } = props.route.params;
  const [userGifts, setUserGifts] = useState([]);

  const handleDelete = async (id) => {
    // Display a confirmation alert before deleting
    Alert.alert(
      "Delete Gift",
      "Are you sure you want to delete this gift?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const db = getFirestore();
            const giftRef = doc(db, "gifts", id);

            // Delete the selected gift card from Firestore
            await deleteDoc(giftRef);

            // Remove the deleted gift card from the state
            setUserGifts((prevGifts) => prevGifts.filter((gift) => gift.id !== id));
          },
        },
      ]
    );
  };

  useEffect(() => {
    // Fetch user's gifts from Firebase
    const fetchUserGifts = async () => {
      try {
        const usersRef = collection(db, "users");
        const userQuery = query(usersRef, where("username", "==", username));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          const userGiftIDs = userData.gifts || [];

          // Fetch gift details for each gift ID
          const giftDetailsPromises = userGiftIDs.map(async (giftID) => {
            const giftRef = doc(db, "gifts", giftID);
            const giftDoc = await getDoc(giftRef);
            if (giftDoc.exists()) {
              return { ...giftDoc.data(), id: giftDoc.id };
            }
            return null;
          });

          // Wait for all promises to resolve and set the userGifts state
          const giftsData = await Promise.all(giftDetailsPromises);
          setUserGifts(giftsData.filter(Boolean));
        }
      } catch (error) {
        console.error("Error fetching user's gifts: ", error);
      }
    };

    fetchUserGifts();
  }, [username]);

  const isWithinAWeek = (unixdate) => {
    const today = new Date().getTime();
    const oneWeekBeforeToday = today - 7 * 24 * 60 * 60 * 1000;

    return unixdate >= oneWeekBeforeToday && unixdate <= today;
  };

  const giftsGivenThisWeek = userGifts
    .filter((giftCard) => isWithinAWeek(Number(giftCard.date)))
    .sort((a, b) => Number(a.date) - Number(b.date));

  const isAfterToday = (unixdate) => {
    const today = new Date().getTime();
    return unixdate > today;
  };

  const upcomingGifts = userGifts
    .filter(
      (giftCard) =>
        !isWithinAWeek(Number(giftCard.date)) &&
        isAfterToday(Number(giftCard.date))
    )
    .sort((a, b) => Number(a.date) - Number(b.date));

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View
      style={{
        ...styles.grayContainer,
        marginTop: marginTopAmnt,
      }}
    >
      <ScrollView width="100%">
        {giftsGivenThisWeek.length > 0 && (
          <Text style={styles.pageHeader}>Gifts Given This Week</Text>
        )}
        {giftsGivenThisWeek.map((giftCard, index) => (
          <GiftDetailsCard
            key={index}
            recipient={giftCard.recipient}
            date={giftCard.date}
            occasion={giftCard.occasion}
            budget={giftCard.budget}
            likes={giftCard.likes}
            dislikes={giftCard.dislikes}
            decidedGift={giftCard.decidedGift}
            onDelete={() => handleDelete(giftCard.id)} // Add onDelete prop
          />
        ))}
        <Text style={styles.pageHeader}>Upcoming Gifts</Text>
        {upcomingGifts.map((giftCard, index) => (
          <GiftDetailsCard
            key={index}
            recipient={giftCard.recipient}
            date={giftCard.date}
            occasion={giftCard.occasion}
            budget={giftCard.budget}
            likes={giftCard.likes}
            dislikes={giftCard.dislikes}
            decidedGift={giftCard.decidedGift}
            onDelete={() => handleDelete(giftCard.id)} // Add onDelete prop
          />
        ))}
        {upcomingGifts.length === 0 && (
          <View styles={styles.container}>
            <Text style={{ color: "gray", margin: 10, fontSize: 18 }}>
              No upcoming gifts to display. Try adding a gift by navigating the
              add gift page at the bottom right!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
