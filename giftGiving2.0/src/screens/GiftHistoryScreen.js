import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, ScrollView, Alert, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton';
import GiftHistoryCard from '../components/GiftHistoryCard';
import { db } from '../config/firebase';
import { styles } from '../styles';
import { getFirestore, addDoc, collection, query, getDocs, where, doc, setDoc } from 'firebase/firestore';

const GiftHistoryScreen = ({ route }) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddGiftModalVisible, setAddGiftModalVisible] = useState(false);
  // Directly destructure username from route.params since initialParams is set
  const { username } = route.params;


  // State for new gift form
  const [newRecipient, setNewRecipient] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [newLikes, setNewLikes] = useState('');
  const [newDislikes, setNewDislikes] = useState('');
  const [newDecidedGift, setNewDecidedGift] = useState('');

  useEffect(() => {
    fetchGiftHistory(username);
  }, [username]);

  const fetchGiftHistory = async (username) => {
    setLoading(true);
    const userQuery = query(collection(db, "users"), where("username", "==", username));
    const userQuerySnapshot = await getDocs(userQuery);

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userGiftIDs = userDoc.data().gifts || [];

      if (userGiftIDs.length > 0) {
        const now = new Date().getTime();
        const giftRef = collection(db, 'gifts');
        const giftsQuerySnapshot = await getDocs(query(giftRef, where('__name__', 'in', userGiftIDs)));

        const pastGifts = giftsQuerySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(gift => gift.date < now);

        setGifts(pastGifts);
      } else {
        setGifts([]);
      }
    } else {
      console.log("User not found");
      setGifts([]);
    }

    setLoading(false);
  };

  const handleSavePastGift = async () => {
    if (!newRecipient.trim()) {
      Alert.alert("Error", "Recipient is required.");
      return;
    }

    if (!isValidDate(newDate)) {
      Alert.alert("Error", "A valid date (MM/DD/YYYY) is required.");
      return;
    }

    const [month, day, year] = newDate.split("/").map(Number);
    const dateTimestamp = new Date(year, month - 1, day).getTime();
    const now = new Date().getTime();

    if (dateTimestamp >= now) {
      Alert.alert("Error", "Please enter a valid past date.");
      return;
    }

    // Prepare the new gift data with the collected inputs
    const newGiftData = {
      recipient: newRecipient.trim(),
      date: dateTimestamp,
      occasion: newOccasion.trim(),
      budget: newBudget.trim(),
      likes: newLikes.trim(),
      dislikes: newDislikes.trim(),
      decidedGift: newDecidedGift.trim(),
    };

    try {
      // Save the new gift data to Firestore
      const db = getFirestore();
      const giftRef = await addDoc(collection(db, "gifts"), newGiftData);
      const giftId = giftRef.id;

      // Fetch the current user's document to update their gift list
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("username", "==", username));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userDocRef = doc(db, "users", userQuerySnapshot.docs[0].id);
        const userData = userQuerySnapshot.docs[0].data();
        const userGiftIDs = userData.gifts || [];
        userGiftIDs.push(giftId);

        await setDoc(userDocRef, { gifts: userGiftIDs }, { merge: true });
      }

      // Refresh the gift history to display the new gift
      fetchGiftHistory(username);
      // Close the modal and reset the form fields
      setAddGiftModalVisible(false);
      setNewRecipient("");
      setNewDate("");
      setNewOccasion("");
      setNewBudget("");
      setNewLikes("");
      setNewDislikes("");
      setNewDecidedGift("");
    } catch (error) {
      console.error("Error saving past gift data: ", error);
      Alert.alert("Error", "Failed to save the gift. Please try again.");
    }
  };

  const isValidDate = (dateString) => {
    // This regex matches dates in MM/DD/YYYY format
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return regex.test(dateString);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderInputField = (placeholder, value, setValue, keyboardType = 'default', autoCapitalize = 'none') => {
    const handleTextChange = (text) => {
      // Special handling for date input to automatically add slashes
      if (placeholder === 'Date (MM/DD/YYYY)' && (text.length === 2 || text.length === 5)) {
        if (text.length === 2 && value.length === 3) {
          // Handle backspace at position 3
          text = text.slice(0, -1);
        } else if (text.length === 5 && value.length === 6) {
          // Handle backspace at position 6
          text = text.slice(0, -1);
        } else if (!text.endsWith('/')) {
          // Add slash if text doesn't already end with one
          text += '/';
        }
      }
      setValue(text);
    };

    return (
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    );
  };

  const renderItem = ({ item }) => {
    return (
      <GiftHistoryCard
        recipient={item.recipient}
        date={item.date}
        occasion={item.occasion}
        budget={item.budget}
        likes={item.likes}
        dislikes={item.dislikes}
        decidedGift={item.decidedGift}
      />
    );
  };

  const screenHeight = Dimensions.get("window").height;
  const marginTopAmnt = screenHeight * 0.09;

  return (
    <View style={{
      ...styles.grayContainer,
      marginTop: marginTopAmnt,
    }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : gifts.length > 0 ? (
        <FlatList
          style={{ width: "100%" }}
          data={gifts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.regularText}>No past gifts to display.</Text>
      )}

      <CustomButton
        title="Add Past Gift"
        onPress={() => setAddGiftModalVisible(true)}
        style={styles.customButton}
      />

      <Modal isVisible={isAddGiftModalVisible}>
        <ScrollView width="100%">
        <View style= {{justifyContent: "flex-start", alignItems: 'center'}}>
          <Text style={styles.pageHeader}>Add Past Gift</Text>
          {renderInputField('Recipient', newRecipient, setNewRecipient)}
          {renderInputField('Date (MM/DD/YYYY)', newDate, setNewDate, 'numeric')}
          {renderInputField('Occasion', newOccasion, setNewOccasion)}
          {renderInputField('Budget', newBudget, setNewBudget, 'numeric')}
          {renderInputField('Likes', newLikes, setNewLikes)}
          {renderInputField('Dislikes', newDislikes, setNewDislikes)}
          {renderInputField('Decided Gift', newDecidedGift, setNewDecidedGift)}
          <CustomButton title="Save Gift" onPress={handleSavePastGift} style={styles.customButton} />
          <CustomButton title="Cancel" onPress={() => setAddGiftModalVisible(false)} style={styles.customButton} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

styles.input = {
  ...styles.input,
  backgroundColor: '#fff',
  color: '#000',
};


export default GiftHistoryScreen;