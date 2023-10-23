import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

function BirthdayInfo({ navigation }) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [note, setNote] = useState("");

  const saveData = () => {
    //handle data submission here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Birthday Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Birthday"
        onChangeText={(text) => setBirthday(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Like"
        onChangeText={(text) => setLike(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dislike"
        onChangeText={(text) => setDislike(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        onChangeText={(text) => setNote(text)}
      />
      <Button title="Save" onPress={saveData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default BirthdayInfo;
