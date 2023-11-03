# Gift Giving Tracker (pj-react-03)

An app designed to streamline the process of gift giving by helping users track their gift ideas, planned giving dates, purchase links, and budget all in one place.

# Tech Stack

The tech stack for our Gift Giving Tracker is designed to provide a robust and user-friendly mobile experience. React Native, complemented by the NativeBase component library, allows for cross-platform compatibility across iOS and Android devices. Expo CLI is utilized to facilitate the development process, enabling quick iterations and easy deployment.

# User Roles

The app caters to anyone looking to give thoughtful and meaningful gifts to their friends and family on time, ensuring that they stay within their budget and never miss an important occasion.

## Our Team Members:

- Marie Karpinska: mariekarpinska
- Benjamin Yang: BenYangSB
- Shang-Hsun Yang: shang-hsun
- Tanish Kumar: tkumar07
- Archit Gupta: archit-gpt

# Installation
Follow the prerequisites and step-by-step guide to set up the app environment and start using the Gift Giving Tracker.

## Prerequisites
Ensure the installation of Node.js, Expo CLI, React Native CLI, and the Expo Go app on your mobile device before proceeding.

#### Dependencies
A list of dependencies is provided, including "@expo/webpack-config", "@react-native-async-storage/async-storage", "firebase", "react", "react-native", and many others that are vital for the app's functionality.

## Installation Steps
Step-by-step instructions guide the user through cloning the repository, navigating to the project directory, installing dependencies, and starting the development server to run the app.

# Functionality

- **Budget Tracking**: The app aggregates the total spent by summing the cost of each gift and displays the remaining budget by deducting this total from the user-entered budget.
- **Gift Planning**: Users can keep track of what their friends like and when they plan to give them gifts.
- **Purchase Links Storage**: Users can store links for purchasing the gifts.
- **First Budget Prompt**: A message prompts users to create their first budget if the value is set to zero.

# Known Problems

- **Negative Budget Values**: Currently, the app allows the budget value to go negative, which is not practical. There is a need to implement a feature to alert users when the remaining budget hits zero and to prevent adding more gifts until a new budget is set.
- **Additional Screen Modifications**: To incorporate the budget cap functionality, changes across various screens in the app may be necessary for a consistent user experience.

# Contributing

To contribute to the app development:

1. Fork the repository.
2. Create a new feature branch.
3. Commit changes to the branch.
4. Push the branch to the origin.
5. Submit a pull request.

The contribution guide is outlined for developers interested in improving the app, suggesting that community contributions are welcomed and appreciated.
