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
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import * as SMS from 'expo-sms'; // FOR TEXT MESSAGES

const phonePubSafe = "5077863666";
const phoneSARN = "5077863777";
const phonePolice = "0123456789";


export default function Home({ setActivePageKey, location, smsAvailable, friendsList, locationString }) {

  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [emergencyText, setEmergencyText] = useState("I am in danger! Need help! My location is:");
  // const [locationString, setLocationString] = useState("");


  const sendSMS = async () => { // SEND MESSAGE FUNCTION
    const {result} = await SMS.sendSMSAsync(
      phoneNumbers,
      `${emergencyText} ${locationString !== "" ? locationString : "pending..."}.`
    );
    console.log(result);
  }

  const makeCall = (phone) => { // PROMPT PHONE TO CALL SARN NUMBER
    if (Platform.OS === "android") { // android phone calls
      Linking.openURL(`tel:${phone}`);
    } else { // apple phone calls
      Linking.openURL(`tel:${phone}`);
    }
  }

  useEffect(() => {
    let phoneNumberList = [];
    for (let i = 0; i < friendsList.length; i++) {
      phoneNumberList.push(friendsList[i]["phone"]);
    }
    setPhoneNumbers(phoneNumberList);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     setLocationString(await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=2e974dd1d4a04968a7a2a045a0b04cd1&language=en&pretty=1`)
  //       .then(response => response.json())
  //       .then(data => {
  //     const address = data.results[0].formatted;
  //   })());
  // }, [];

  return (
    <View style={styles.page}>
      <View style={styles.sendSMSContainer}>
        {smsAvailable
          ? <TouchableOpacity style={styles.sendSMS} onPress={sendSMS} disabled={!smsAvailable}>
              <Image source={require("../img/Text.png")} style={styles.sendSMSImg} />
              <Text style={styles.sendSMSText}>Send SMS</Text>
            </TouchableOpacity>
          : <Text>Unfortunately, SMS is not available on this device</Text>
        }
      </View>
      {/* <View>
        <Button onPress={requestPermissions} title="Enable background location" />
      </View> */}
      <View style={styles.callBtnContainer}>
        <TouchableOpacity style={styles.callBtn} onPress={() => makeCall(phonePubSafe)}>
          <Image source={require("../img/PubSafe.png")} style={styles.secImg} />
          <Text style={styles.secText}>Pub Safe Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={() => makeCall(phoneSARN)}>
          <Image source={require("../img/SARN.png")} style={styles.secImg} />
          <Text style={styles.secText}>SARN Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={() => makeCall(phonePolice)}>
          <Image source={require("../img/Police.png")} style={styles.secImg} />
          <Text style={styles.secText}>Call Police</Text>
        </TouchableOpacity>
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
  sendSMSContainer: {
    width: "90%",
    height: "20%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sendSMS: {
    width: "90%",
    height: "100%",
    backgroundColor: "#ff4810",
    borderRadius: 30,
    margin: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    overflow: "hidden",
    position: "relative"
  },
  sendSMSImg: {
    height: "80%",
    width: "25%",
    overflow: "hidden",
    objectFit: "contain",
    margin: 20,
    marginTop: 30
  },
  sendSMSText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  callBtnContainer: {
    marginTop: "5%",
    width: "100%",
    position: "relative"
  },
  callBtn: {
    width: "80%",
    height: "15%",
    backgroundColor: "#f5e62e",
    borderRadius: 100,
    margin: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
    marginTop: 30,
    marginBottom: 0
  },
  secImg: {
    height: "80%",
    width: "15%",
    overflow: "hidden",
    objectFit: "contain",
    margin: 10
  },
  secText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  }
});