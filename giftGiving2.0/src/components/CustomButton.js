import React from "react";
import { Pressable, Text } from "react-native";

const CustomButton = ({ title, onPress }) => {
  // Declare the CustomButton component
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#091f36" : "#092936",
          borderRadius: 30,
          width: 200,
          marginHorizontal: 50,
          marginVertical: 5,
          paddingVertical: 10,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 4,
        },
      ]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#ebf6fa" }}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton; // Export the component
