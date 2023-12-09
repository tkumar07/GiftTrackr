import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import Home from "./Home";
import CalendarScreen from "./src/screens/CalendarScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
import GiftHistoryScreen from "./src/screens/GiftHistoryScreen";
import AddGift from "./src/screens/AddGift";
import EditGift from "./src/screens/EditGift";
import Notifications from "./src/components/Notification";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "@firebase/firestore";

import { db } from "./src/config/firebase";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import { styles } from "./src/styles";
import { useTheme } from "react-native-paper";
import * as ExpoNotifications from "expo-notifications";
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  console.disableYellowBox = true;
  console.warn = () => {};

  async function scheduleNotification() {
    await ExpoNotifications.scheduleNotificationAsync({
      content: {
        title: "Hello!",
        body: "This is your scheduled notification.",
      },
      trigger: {
        seconds: 30,
      },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === "ios") {
      const { status: existingStatus } =
        await ExpoNotifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // Only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== "granted") {
        const { status } = await ExpoNotifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // Stop here if the user did not grant permissions
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      // Get the token that uniquely identifies this device
      token = (await ExpoNotifications.getExpoPushTokenAsync()).data;
      // console.log(token); // Log the token to check in the console
    } else {
      // You can add logic for Android here if needed
    }
    return token;
  }

  async function fetchUserGifts(username) {
    if (username) {
      // console.log("INSIDE FETCH USER ");
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      // console.log(username);
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref; // Reference of the first document
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();

          if (userData.notificationsEnabled) {
            // console.log("found gift data");
            // console.log(userDocSnapshot.data());
            return {
              gifts: userData.gifts || [],
              daysBeforeEvent: userData.daysBeforeEvent || 0,
            };
          }
        } else {
          console.log("user has no gifts");
        }
      } else {
        // console.log("No user found");
        return []; // Return empty array if user is not found
      }
    }
  }

  async function fetchGiftDetails(giftIds) {
    let giftDetails = [];

    for (const giftId of giftIds) {
      // console.log("gift id:");
      // console.log(giftId);
      const giftRef = doc(db, "gifts", giftId);
      const giftSnapshot = await getDoc(giftRef);
      // console.log("finding gft ref");
      // console.log(giftSnapshot.data().date);

      if (giftSnapshot.exists()) {
        giftDetails.push(giftSnapshot.data());
      } else {
        // console.log(`No details found for gift with ID: ${giftId}`);
      }
    }

    return giftDetails;
  }

  async function scheduleGiftNotifications(username) {
    const { gifts, daysBeforeEvent } = await fetchUserGifts(username);

    let giftsReturned = await fetchGiftDetails(gifts);

    // console.log("Found gifts:" + (await giftsReturned).length);

    giftsReturned.forEach(async (gift) => {
      // console.log("new gift");
      // console.log(gift);
      const notificationTime = new Date(
        gift.date - daysBeforeEvent * 24 * 60 * 60 * 1000
      );
      console.log("notifcation time in DB: " + gift.date);
      console.log("notifcation time: " + notificationTime.getDate());
      console.log(new Date());
      if (notificationTime > new Date()) {
        // Only schedule if the date is in the future
        await ExpoNotifications.scheduleNotificationAsync({
          content: {
            title: "Upcoming Gift Reminder",
            body: `Don't forget the gift scheduled for ${gift.recipient}`,
          },
          trigger: notificationTime,
        });

        console.log("scheduled notifcation at: " + notificationTime);
      } else {
        console.log("NOTIFCATION PASSED");
      }
    });
  }

  // async function scheduleNotification() {
  //   await ExpoNotifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Scheduled Notification",
  //       body: 'This is the body of the scheduled notification',
  //       data: { data: 'goes here' },
  //     },
  //     trigger: { seconds: 60 }, // Schedules the notification after 60 seconds
  //   });
  // }


  const handleLogout = () => {  
    setIsLoggedIn(false);
  };
  
  ExpoNotifications.addNotificationReceivedListener(notification => {
    console.log(notification);
  });

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "users");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = [];
      snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }));
      setPeople(usersList);
      setLoading(false);
    });

    ExpoNotifications.addNotificationReceivedListener((notification) => {
      console.log("Notification received!", notification);
    });
  }, []);

  const handleSuccessfulLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    if (Platform.OS === "ios") {
      registerForPushNotificationsAsync();
    }
    // scheduleNotification();
    scheduleGiftNotifications(user);
  };

  const onSwitchToSignUp = () => {
    setShowLogin(false);
  };

  const onSwitchToLogin = () => {
    setShowLogin(true);
  };

  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent";

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          {showLogin ? (
            <Login
              onSuccessfulLogin={handleSuccessfulLogin}
              onSwitchToSignUp={onSwitchToSignUp}
            />
          ) : (
            <SignUp
              onSuccessfulSignUp={handleSuccessfulLogin}
              onSwitchToLogin={onSwitchToLogin}
            />
          )}
        </View>
      ) : (
        <>
          <Tab.Navigator
            labeled={false}
            barStyle={{ backgroundColor: styles.darkerAccent }}
            activeColor={styles.almostWhiteText}
            tabBarOptions={{
              activeTintColor: "transparent",
              inactiveTintColor: styles.grayedOutColor,
            }}
          >
            <Tab.Screen
              name="Home"
              initialParams={{ username: username }}
              component={Home}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="home"
                    color={styles.almostWhiteText}
                    size={26}
                    style={{
                      color:
                        color === styles.almostWhiteText
                          ? styles.almostWhiteText
                          : styles.grayedOutColor,
                    }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Calendar"
              component={CalendarScreen}
              initialParams={{ username: username }}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="calendar"
                    color={styles.almostWhiteText}
                    size={26}
                    style={{
                      color:
                        color === styles.almostWhiteText
                          ? styles.almostWhiteText
                          : styles.grayedOutColor,
                    }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Budget"
              component={BudgetScreen}
              initialParams={{ username: username }}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-cash"
                    color={styles.almostWhiteText}
                    size={26}
                    style={{
                      color:
                        color === styles.almostWhiteText
                          ? styles.almostWhiteText
                          : styles.grayedOutColor,
                    }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="AddGift"
              initialParams={{ username: username }}
              component={AddGift}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="gift"
                    color={styles.almostWhiteText}
                    size={26}
                    style={{
                      color:
                        color === styles.almostWhiteText
                          ? styles.almostWhiteText
                          : styles.grayedOutColor,
                    }}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="GiftHistory"
              component={GiftHistoryScreen}
              initialParams={{ username: username }}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="history" // Choose an appropriate icon
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Notifications"
              component={Notifications}
              initialParams={{ username: username }}
              options={{
                tabBarIcon: ({ color = "defaultColorHere" }) => (
                  <MaterialCommunityIcons
                    name="bell-outline"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="EditGift"
              component={EditGift}
              options={{
                tabBarVisible: false, // Hide the bottom tab bar when editing
              name="Logout"
              component={View} // A dummy component, since we will handle logout on press
              listeners={{
                tabPress: (e) => {
                  e.preventDefault(); // Prevent default action
                  handleLogout(); // Call your logout function
                },
              }}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="logout"
                    color={styles.almostWhiteText}
                    size={26}
                    style={{
                      color:
                        color === styles.almostWhiteText
                          ? styles.almostWhiteText
                          : styles.grayedOutColor,
                    }}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}
