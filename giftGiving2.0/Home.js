import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { GiftDetailsCard } from "./src/components/GiftDetailsCard";
import { styles } from "./src/styles";

const fakeGiftCards = [
  {
    recipient: "Brandon",
    date: "1698386462000",
    occasion: "Birthday",
    budget: "$10",
    likes: "Coffee",
    dislikes: "Milk",
    decidedGift: "Starbucks Giftcard",
  },
  {
    recipient: "Alice",
    date: "1699394862000",
    occasion: "House Warming",
    budget: "$50",
    likes: "Disney, Mandalorian, Painting",
    dislikes: "Coffee",
    decidedGift: "grogu stuffed animal",
  },
  {
    recipient: "Tootsie the dog",
    date: "1700777262000",
    occasion: "Birthday",
    budget: "$10",
    likes: "Walks, bells, treats",
    dislikes: "Vacuum cleaner",
    decidedGift: "dog bone",
  },
  {
    recipient: "Bob",
    date: "1703369262000",
    occasion: "Chrismtas",
    budget: "$75",
    likes: "Movies, Painting, Cooking",
    dislikes: "Technology, Sports",
    decidedGift: "undecided",
  },
];

function HomeScreen() {
  // Function to check if the gift date is within a week from today
  const isWithinAWeek = (unixdate) => {
    const today = new Date().getTime();
    const oneWeekBeforeToday = today - 7 * 24 * 60 * 60 * 1000;

    return unixdate >= oneWeekBeforeToday && unixdate <= today;
  };

  // Filter and sort the gift cards
  const giftsGivenThisWeek = fakeGiftCards
    .filter((giftCard) => isWithinAWeek(Number(giftCard.date)))
    .sort((a, b) => Number(a.date) - Number(b.date));

  const upcomingGifts = fakeGiftCards
    .filter((giftCard) => !isWithinAWeek(Number(giftCard.date)))
    .sort((a, b) => Number(a.date) - Number(b.date));

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View
      style={{
        ...styles.container,
        marginTop: marginTopAmnt,
      }}
    >
      <ScrollView width="100%">
        <Text style={styles.pageHeader}>Gifts Given This Week:</Text>

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
          />
        ))}
        <Text style={styles.pageHeader}>Upcoming Gifts:</Text>
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
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
