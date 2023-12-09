import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
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
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import AddGift from "./src/screens/AddGift";

function HomeScreen(props) {
  const { username } = props.route.params;
  const [userGifts, setUserGifts] = useState([]);
  const navigation = useNavigation();

  const fetchUserGifts = async () => {
    try {
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("username", "==", username));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        const userGiftIDs = userData.gifts || [];
        if (userGiftIDs.empty) {
          // console.log("No gifts found");
        }
        const giftDetailsPromises = userGiftIDs.map(async (giftID) => {
          const giftRef = doc(db, "gifts", giftID);
          const giftDoc = await getDoc(giftRef);
          if (giftDoc.exists()) {
            return { ...giftDoc.data(), id: giftDoc.id };
          } else {
            // console.log("Gift is deleted! ", giftID);
          }
          return null;
        });

        const giftsData = await Promise.all(giftDetailsPromises);
        setUserGifts(giftsData.filter(Boolean));
      }
    } catch (error) {
      console.error("Error fetching user's gifts: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserGifts();
    }, [props.navigation, username])
  );

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
  let marginTopAmnt = screenHeight * 0.09;

  if (marginTopAmnt > 75) {
    marginTopAmnt = 75;
  }
  const goToAddGift = () => {
    // Navigate to the AddGift screen without using props.navigation
    props.navigation.push("AddGift", { username });
  };
  return (
    <View style={{ ...styles.grayContainer, marginTop: marginTopAmnt }}>
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
            id={giftCard.id}
            updateGifts={fetchUserGifts}
            navigation={props.navigation}
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
            id={giftCard.id}
            updateGifts={fetchUserGifts}
            navigation={props.navigation}
          />
        ))}
        {upcomingGifts.length === 0 && (
          <View styles={styles.container}>
            <Text style={{ color: "gray", margin: 30, fontSize: 22 }}>
              No upcoming gifts to display!
              {"\n"}
              {"\n"}
              Try adding a gift by pressing "+"
            </Text>
          </View>
        )}
      </ScrollView>
      
      {/* Floating action button for adding gifts */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddGift", { username: username })}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
