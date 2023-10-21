import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import CalendarScreen from "./src/screens/CalendarScreen";
import Budget from "./src/screens/Budget";
import AddGift from "./src/screens/AddGift";
import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Budget" component={Budget} />
        <Tab.Screen name="AddGift" component={AddGift} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
