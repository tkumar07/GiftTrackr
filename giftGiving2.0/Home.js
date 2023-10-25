import React from "react";
import { View, Text } from "react-native";
import { GiftDetailsCard } from "./src/components/GiftDetailsCard";
import { styles } from "./src/styles";

const fakeGiftCards = [
  {
    recipient: "Alice",
    date: "November 11, 2023",
    occasion: "Birthday",
    budget: "$50",
    likes: "Disney, Mandalorian, Painting",
    dislikes: "Coffee",
    decidedGift: "grogu stuffed animal",
  },
  {
    recipient: "Bob",
    date: "December 16, 2023",
    occasion: "Anniversary",
    budget: "$75",
    likes: "Movies, Painting, Cooking",
    dislikes: "Technology, Sports",
    decidedGift: "undecided",
  },
];

function HomeScreen() {
  return (
    <View style={{ ...styles.container, marginTop: 10 }}>
      <Text>Upcoming Gifts:</Text>
      {fakeGiftCards.map((giftCard, index) => (
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
    </View>
  );
}

export default HomeScreen;
