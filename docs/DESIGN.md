
## System Architecture Overview

### Diagram
<img width="325" alt="Screenshot 2023-11-25 at 11 21 42 PM" src="https://github.com/ucsb-cs184-f23/pj-react-03/assets/65988599/f6dfed04-fd0e-4256-a2fa-3f0c7296bfac">


### Explanation

The system architecture for the GiftTrackr App is designed with simplicity and efficiency in mind. Here's a breakdown of each component:

#### 1. User (Icon)
   - Represents the end-users of the GiftTrackr App.

#### 2. GiftTrackr App Visual Interface
   - The frontend of the GiftTrackr App, developed using Expo CLI and React Native for cross-platform compatibility.
   - Provides a user-friendly interface for users to interact with the app and manage their gift-giving activities.

#### 3. Expo CLI Web Server (Expo localhost)
   - Hosts the GiftTrackr App during the development phase on the local machine.
   - Allows the developers to test the app on a web browser through Expo's development server.

#### 4. Firestore Database
   - A cloud-based NoSQL database provided by Firebase.
   - Stores and manages the data related to users, gifts, budgets, and recipient preferences.
   - Facilitates real-time data synchronization between the app and the backend.

### How It Works

1. **User Interaction:**
   - Users interact with the GiftTrackr App through the visual interface, accessing it from their devices through the Expo Go App.

2. **Localhost and Expo CLI:**
   - The app is hosted on a local machine using Expo CLI's web server.

3. **Firestore Database:**
   - The app communicates with the Firestore database to store and retrieve user data, gift details, and preferences.

4. **Real-Time Updates:**
   - Firestore enables real-time data synchronization, ensuring that any changes made by users are instantly reflected across the app and the database.

## Important Team Design Decisions Summary

Here is a summary of important design decisions made for the GiftTrackr App:
| **Date**                    | **Decision and Rationale**                                                                                                                                                                                                                                                                          |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sunday, October 15th        | Decided to use React Native for app development. React Native allows building apps for both iOS and Android using a single codebase.                                                                                                                                                                                                                |
| Wednesday, October 18th     | Initially chose NativeBase for component design but switched to react-native-elements on November 1st. [team/sprint01/lec10.md](https://github.com/ucsb-cs184-f23/pj-react-03/tree/main/team/sprint01/lec10.md) NativeBase was difficult and not working well, while react-native-elements, though less visually appealing, was easier to implement and use.                                   |                                                                                                                          |
| Monday, October 23rd        | Decided to stick to one main CSS styling file for consistent styles across pages.                                                                                     [team/sprint01/lec07.md](https://github.com/ucsb-cs184-f23/pj-react-03/tree/main/team/sprint01/lec07.md)                                                                                 |                                                                                                                          |
| Thursday, October 26th      | Decided to create a users and gifts collections in the database to store gift data for each user. [team/sprint01/sec04.md](https://github.com/ucsb-cs184-f23/pj-react-03/tree/main/team/sprint01/sec04.md)                |
| October 30th                | Finalized the overall theme of the app, including the color scheme and text fonts. The agreed-upon app name is "GiftTrackr."                                                                                                                                                                   |

## User Experience (UX)

1. **Consistent Styling:**
   - A consistent and visually appealing design language is maintained throughout the app.
   - The use of a single CSS styling file ensures uniformity, creating a cohesive and polished appearance.

2. **Intuitive Navigation:**
   - The app aims to provide users with a seamless and intuitive navigation experience.
   - Clear and logically organized menus and pages ensure users can easily access and manage their gift-giving activities.
   - *!TODO test this with a user test!

### User Interface (UI) Elements

1. **Gift Entry Form:**
   - An easy-to-use form for entering gift details, capturing essential information such as recipient, occasion, and budget.
   - Intuitive input fields and validation ensure accurate data entry.

2. **Chronological Gift List:**
   - The app displays gifts in a sorted chronological list, allowing users to view upcoming events and plan accordingly.
   - Quick access to past and future gifts facilitates efficient organization.

### User Feedback Elements

1. **Error Messaging:**
   - Clear and concise error messages are implemented to guide users in case of input errors or issues when signing up and logging in.
   - Informative alerts ensure users understand and rectify any mistakes during the gift entry process.

2. **Success Indicators:**
   - Gifts appear when a gift is added on the home screen and disappear following a gift being deleted displaying successful actions.
   

## User Flow between pages. All pages are navigatable through the bottom tab and the actions for each page is listed on each box too

<img width="244" alt="Screenshot 2023-11-29 at 2 53 38 PM" src="https://github.com/ucsb-cs184-f23/pj-react-03/assets/65988599/24f3cd9e-f002-431d-aed2-18f70ea1107e">

