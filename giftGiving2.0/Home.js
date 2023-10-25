import React from "react";
import { View, Text } from "react-native";
import { GiftDetailsCard } from "./src/components/GiftDetailsCard";
import { styles } from "./src/styles";

const fakeGiftCards = [
  {
    recipient: "Alice",
    date: "2023-11-10",
    occasion: "Birthday",
    gift: "Gift Card 1",
  },
  {
    recipient: "Bob",
    date: "2023-12-05",
    occasion: "Anniversary",
    gift: "Gift Card 2",
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
          gift={giftCard.gift}
        />
      ))}
    </View>
  );
}

export default HomeScreen;
