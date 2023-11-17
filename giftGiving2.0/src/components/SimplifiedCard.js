import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import moment from "moment";
import { styles } from "../styles";

const SimplifiedCard = ({ recipient, date, occasion }) => {
  const formatDate = (unixTimestamp) => {
    const dateObject = moment(unixTimestamp);
    return dateObject.format("MMMM D, YYYY");
  };

  const formattedDate = formatDate(date);

  const screenWidth = Dimensions.get("window").width;

  return (
    <Card
      containerStyle={{ ...styles.cardContainer, width: screenWidth * 0.9 }}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.subtitle}>{recipient}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.text}>{occasion}</Text>
      </View>
    </Card>
  );
};

export { SimplifiedCard };
