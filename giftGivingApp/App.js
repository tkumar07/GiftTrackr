import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home";
import CalendarScreen from "./src/screens/CalendarScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
import AddGiftScreen from "./src/screens/AddGiftScreen";

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Calendar" component={CalendarScreen} />
          <Tab.Screen name="Budget" component={BudgetScreen} />
          <Tab.Screen name="AddGift" component={AddGiftScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
