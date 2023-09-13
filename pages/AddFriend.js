import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Alert,
  Platform,
  Linking,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as SMS from 'expo-sms'; // FOR TEXT MESSAGES
import * as Location from 'expo-location'; // FOR PHONE LOCATION

export default function AddFriend({ setActivePageKey, friendsList, setFriendsList }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [available, setAvailable] = useState(true);

  const completeFriend = () => {
    // Update list
    let newFriends = friendsList.slice(0);
    let newFriend = {
      name: name,
      phone: phone,
      available: available
    }
    newFriends.push(newFriend);
    setFriendsList(newFriends);
    // Resets
    setName("");
    setPhone("");
    setAvailable(true);
    // Return to settings
    setActivePageKey(1);
  }
  const cancel = () => {
    // Resets
    setName("");
    setPhone("");
    setAvailable(true);
    // Return to settings
    setActivePageKey(1);
  }

  return (
    <View style={styles.page}>
      <TextInput
        style={styles.nameInput}
        editable
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={styles.numberInput}
        editable
        numeric
        keyboardType={"numeric"}
        onChangeText={(text) => setPhone(text)}
        value={phone}
        placeholder="Number"
      />
      <TouchableOpacity style={[styles.availability, available ? styles.avail0 : styles.avail1]} onPress={() => {setAvailable(!available)}}>
        <Text style={styles.avaText}>{available ? "Available" : "Not Available"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addFriend} onPress={completeFriend}>
        <Text style={[styles.lowText, styles.addft]}>Add Friend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={cancel}>
        <Text style={[styles.lowText, styles.canct]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  nameInput: {
    backgroundColor: "lightgrey",
    width: "80%",
    height: "10%",
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 10
  },
  numberInput: {
    backgroundColor: "lightgrey",
    marginTop: 20,
    width: "80%",
    height: "10%",
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 10
  },
  availability: {
    padding: 14,
    paddingHorizontal: 20,
    margin: 30,
    borderRadius: 10
  },
  avaText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  avail0: {
    backgroundColor: "#1d5751"
  },
  avail1: {
    backgroundColor: "#ff4810"
  },
  addFriend: {
    marginTop: 0,
    backgroundColor: "#f5e62e",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    borderRadius: 100
  },
  cancel: {
    marginTop: 20,
    backgroundColor: "#ff4810",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    height: "10%",
    borderRadius: 100
  },
  lowText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addft: {
    color: "black"
  },
  canct: {
    color: "white"
  }
});