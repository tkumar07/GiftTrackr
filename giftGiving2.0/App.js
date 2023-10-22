import { StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import CalendarScreen from "./src/screens/CalendarScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
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
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="AddGift" component={AddGift} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
