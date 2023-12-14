# Gift Giving Tracker

An app designed to streamline the process of gift giving by helping users track their gift ideas, planned giving dates, purchase links, and budget all in one place.

# Tech Stack

The tech stack for the Gift Giving Tracker is designed to provide a robust and user-friendly mobile experience. React Native, complemented by the NativeBase component library, allows for cross-platform compatibility across iOS and Android devices. Expo CLI is utilized to facilitate the development process, enabling quick iterations and easy deployment.

# User Roles

The app caters to anyone looking to give thoughtful and meaningful gifts to their friends and family on time, ensuring that they stay within their budget and never miss an important occasion.

# Installation
Follow the prerequisites and step-by-step guide to set up the app environment and start using the Gift Giving Tracker.

## Prerequisites
Ensure the installation of Node.js, Expo CLI, and React Native on your desktop device and the Expo Go app on your mobile device before proceeding.

#### Dependencies
A list of dependencies is provided, including "@expo/webpack-config", "@react-native-async-storage/async-storage", "firebase", "react", "react-native", and many others that are vital for the app's functionality.

## Installation Steps

### Expo CLI and React Native:

If you don't already have Node.js installed, download and install it from nodejs.org.
Open your terminal or command prompt and run the following command to install Expo CLI globally:
`npm install -g expo-cli`
To install React Native, use the following command:
`npm install -g react-native-cli`

### Expo Go App on Your Phone:

On your Android or iOS device, go to your respective app store (Google Play Store for Android or the Apple App Store for iOS).
Search for "Expo Go" and install the Expo Go app on your device.
Please ensure that you have Expo CLI, React Native, and the Expo Go app installed before following the specific installation instructions for your mobile app project.

#### Dependencies
- "@expo/webpack-config": "^19.0.0"
- "@react-native-async-storage/async-storage": "^1.19.4"
- "@react-native-community/masked-view": "^0.1.11"
- "@react-native-firebase/auth": "^18.6.0"
- "@react-native-firebase/firestore": "^18.6.0"
- "@react-navigation/bottom-tabs": "^6.5.10"
- "@react-navigation/material-bottom-tabs": "^6.2.18"
- "@react-navigation/native": "^6.1.9"
- "dotenv": "^16.3.1"
- "expo": "~49.0.15"
- "expo-status-bar": "~1.6.0"
- "firebase": "^10.5.2"
- "react": "18.2.0"
- "react-dom": "18.2.0"
- "react-native": "0.72.6"
- "react-native-calendars": "^1.1301.0"
- "react-native-elements": "^3.4.3"
- "react-native-gesture-handler": "^2.13.3"
- "react-native-reanimated": "^3.5.4"
- "react-native-safe-area-context": "^4.7.3"
- "react-native-screens": "^3.26.0"
- "react-native-section-list-get-item-layout": "^2.2.3"
- "react-native-vector-icons": "^10.0.0"
- "react-native-web": "~0.19.6"
- "@babel/core": "^7.20.0"
- "react-native-dotenv": "^3.4.9"

## Installation Steps

#### Clone the Repository

1. Open your terminal or command prompt.
2. Change the current working directory to where you want to store the project.
3. Run the following command to clone the project from GitHub:

`git clone https://github.com/tkumar07/GiftTrackr`

Navigate to the project directory:

`cd giftGiving2.0`

Install project dependencies using npm. Run the following command:

`npm install`

Start the Development Server:
After the dependencies are installed, start the development server:

`npx expo start `

Scan the QR code on your phone with Expo Go downloaded on it and enjoy the app! Make sure both your laptop and phone are connected to the same WiFi network.

# Functionality

- **Gift Planning**: Users can keep track of what their friends like and when they plan to give them gifts.
- **Gift Idea Storage**: Users can also store what they plan on giving and how much they are willing to spend. 
- **Event Storage**: Users can add custom events to their calendar so they never forget a gift giving occassion.
- **Budget Tracking**: The app aggregates the total spent by summing the cost of each gift and displays the remaining budget by deducting this total from the user-entered budget.
- **First Budget Prompt**: A message prompts users to create their first budget if the value is set to zero.

# Known Problems and Implemented Fixes

1. **Negative Budget Values**: 
   - **Previous Problem**: The app allowed the budget value to go negative.
   - **Implemented Fix**: This issue has been resolved. The app now prevents the budget from dropping below zero and alerts users when the remaining budget hits zero, stopping the addition of new gifts until a new budget is set.

2. **Refreshing Budget Values**: 
   - **Previous Problem**: Budget values were not updated immediately after deleting a gift, requiring a reload of the app to reflect changes in the total spent value on the budget page.
   - **Implemented Fix**: The app's budget calculation logic has been updated to refresh dynamically. This ensures real-time updating of budget values without the need to reload the app, providing a smoother and more accurate budget tracking experience.

3. **Screen Size Responsiveness**: 
   - **Previous Problem**: The app was not very user-friendly on very small screens.
   - **Implemented Fix**: Screen responsiveness has been enhanced. For iOS devices, users can adjust their global text size settings to affect the app's text display, done by navigating to Settings > Accessibility > Display & Text Size > Larger Text. This customization helps improve readability and overall user experience in our app.

# Contributing

To contribute to the app development:

1. Fork the repository.
2. Create a new feature branch.
3. Commit changes to the branch.
4. Push the branch to the origin.
5. Submit a pull request.

Community contributions are welcomed and appreciated.
