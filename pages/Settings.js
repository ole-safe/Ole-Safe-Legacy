import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
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
  Image,
  TouchableOpacity
} from 'react-native';
import * as SMS from 'expo-sms'; // FOR TEXT MESSAGES
import * as Location from 'expo-location'; // FOR PHONE LOCATION
import * as ExpoLinking from 'expo-linking'; // FOR PHONE CALLS

export default function Settings({ setActivePageKey, friendsList, setFriendsList }) {

  const deleteFriend = (i) => {
    let workFriends = friendsList.slice(0);
    workFriends.splice(i,1);
    setFriendsList(workFriends);
  }

  return (
    <View style={styles.page}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.friendsSection}>
        <Text style={styles.subtitle}>Friends</Text>
        <TouchableOpacity style={styles.addFriend} onPress={() => setActivePageKey(3)}>
          <Image source={require("../img/Add_friend_icon.png")} style={styles.addFriendImg} />
          <Text style={styles.addFriendText}>Add Friend</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollFriends}>
          {friendsList.map((friend, i) => {
            return (
              <View style={styles.friend} key={i}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendSub}>{friend.phone}</Text>
                <Text style={styles.friendSub}>{friend.available ? "Available" : "Not Available"}</Text>
                <TouchableOpacity style={styles.delete} onPress={() => deleteFriend(i)}>
                  <Image style={styles.actionIcon} source={require("../img/Delete_button.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.edit}>
                  <Image style={styles.actionIcon} source={require("../img/Edit_button.png")} />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
  title: {
    marginTop: -30,
    fontSize: 50,
    fontWeight: "bold"
  },
  friendsSection: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "medium",
    fontSize: 30
  },
  addFriend: {
    margin: 10,
    width: "80%",
    backgroundColor: "#ff4810",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    borderRadius: 20
  },
  addFriendImg: {
    height: "200%",
    width: "15%",
    marginRight: 10,
    overflow: "hidden",
    objectFit: "contain"
  },
  addFriendText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  scrollFriends: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  friend: {
    backgroundColor: "#f5e62e",
    margin: 10,
    padding: 20,
    width: 250,
    display: "flex",
    alignItems: "flex-start",
    position: "relative",
    borderRadius: 20
  },
  friendName: {
    fontSize: 20,
    fontWeight: "bold"
  },
  friendSub: {
    fontSize: 16
  },
  delete: {
    height: 50,
    overflow: "hidden",
    position: "absolute",
    top: -15,
    left: -10,
    zIndex: 1
  },
  edit: {
    height: 50,
    overflow: "hidden",
    position: "absolute",
    top: -15,
    left: -50,
  },
  actionIcon: {
    height: "100%",
    overflow: "hidden",
    objectFit: "contain"
  }
});