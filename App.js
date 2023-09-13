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
import * as Location from 'expo-location'; // FOR PHONE LOCATION
import * as ExpoLinking from 'expo-linking'; // FOR PHONE CALLS

import Home from "./pages/Home.js"; // IMPORT HOME
import Settings from "./pages/Settings.js";
import Resources from "./pages/Resources.js";
import AddFriend from "./pages/AddFriend.js";

import * as SQLite from "expo-sqlite";
import * as Sharing from "expo-sharing";

import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

// COMMANDS: npx expo start --tunnel


//Create table
// sql_Creation = 'CREATE TABLE IF NOT EXISTS friends(Name, Phone, Availability, PRIMARY KEY(Name, Phone))';
// db.run(sql_Creation); //execute SQL queries


export default function App() {
  const [activePageKey, setActivePageKey] = useState(0);

  const [smsAvailable, setSmsAvailable] = useState(false); // check is sms available for device

  const [location, setLocation] = useState(null);
  const [locationString, setLocationString] = useState(""); //Location of user ser to null

  const [friendsList, setFriendsList] = useState([
    {
      name: "Evan",
      phone: "2345678901",
      available: true
    },
    {
      name: "Swagat",
      phone: "1234567890",
      available: true
    },
    {
      name: "Dhesel",
      phone: "3456789012",
      available: true
    }
  ]);

  useEffect(() => { // CHECK ABILITY TO SEND MESSAGE ON DEVICE
    async function checkAvailability() {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setSmsAvailable(isSmsAvailable);
    }
    checkAvailability();
  }, []);

  useEffect(() => { // LOCATION GETTING at open of app
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } //Get current Co-ordinates of the Users phone and set into location
      const location1 = await Location.getCurrentPositionAsync({});
      setLocation(location1);
      //Uses API  to reverse Geocode, to get readable adress
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location1.coords.latitude},${location1.coords.longitude}&key=2e974dd1d4a04968a7a2a045a0b04cd1&language=en&pretty=1`)
      .then(response => response.json())
      .then(data => {
        const address = data.results[0].formatted;
        setLocationString(address);
    });
    })();
  }, []);
//CONNECTION TO SQLITE3 DATABASE IN DEVELOPMENT
  // const [db, setDb] = useState(SQLite.openDatabase("test.sqlite"));
  // const exportDb = async () => {
  //   if (Platform.OS === "android") {
  //     const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  //     if (permissions.granted) {
  //       const base64 = await FileSystem.readAsStringAsync(
  //         FileSystem.documentDirectory + 'SQLite/test.sqlite',
  //         {
  //           encoding: FileSystem.EncodingType.Base64
  //         }
  //       );

  //       await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'test.sqlite', 'application/octet-stream')
  //       .then(async (uri) => {
  //         await FileSystem.writeAsStringAsync(uri, base64, { encoding : FileSystem.EncodingType.Base64 });
  //       })
  //       .catch((e) => console.log(e));
  //     } else {
  //       console.log("Permission not granted");
  //     }
  //   } else {
  //     await Sharing.shareAsync(FileSystem.documentDirectory + 'SQLite/test.sqlite');
  //   }
  // }

  // const importDb = async () => {
  //   let result = await DocumentPicker.getDocumentAsync({
  //     copyToCacheDirectory: true
  //   });

  //   if (result.type === 'success') {
  //     setIsLoading(true);
      
  //     if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  //     }

  //     const base64 = await FileSystem.readAsStringAsync(
  //       result.uri,
  //       {
  //         encoding: FileSystem.EncodingType.Base64
  //       }
  //     );

  //     await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'SQLite/test.sqlite', base64, { encoding: FileSystem.EncodingType.Base64 });
  //     await db.closeAsync();
  //     setDb(SQLite.openDatabase('test.sqlite'));
  //   }
  // };

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   db.transaction((tx) => {
  //     tx.executeSql('CREATE TABLE IF NOT EXISTS friends(Name, Phone, Availability, PRIMARY KEY(Name, Phone))');
  //   });

  //   // db.transaction((tx) => {
  //   //   tx.ex
  //   // });
  // }, []);

  const handleTitle9 = () => { // OPEN TITLE 9 FORM WEBSITE
    Linking.openURL("https://wp.stolaf.edu/title-ix/report-sexual-violence/")
  }


  return (//Intergration with React Native
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image source={require("./img/Logo.png")}  style={styles.logoImg} />
      </View>
      <View style={styles.pageContainer}>
        {/* PAGES */}
        {activePageKey === 0 ? <Home      //Decide what page to show until line 202
          setActivePageKey={setActivePageKey} 
          location={location}
          locationString={locationString}
          smsAvailable={smsAvailable}
          friendsList={friendsList} /> : ""}
        {activePageKey === 1 ? <Settings
          setActivePageKey={setActivePageKey}
          friendsList={friendsList} 
          setFriendsList={setFriendsList} /> : ""}
        {activePageKey === 2 ? <Resources
          setActivePageKey={setActivePageKey} /> : ""}
        {activePageKey === 3 ? <AddFriend
          setActivePageKey={setActivePageKey}
          friendsList={friendsList} 
          setFriendsList={setFriendsList} /> : ""}
      </View>
      {/* NAVIGATION BAR */}
      <View style={styles.navbar}>
        <TouchableOpacity style={[styles.navbtn]} onPress={handleTitle9}>
          <Image source={require("./img/TitleIX.png")}  style={styles.navimg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navbtn, styles.homebtn]} onPress={() => setActivePageKey(0)}>
          <Image source={require("./img/Home.png")}  style={styles.navimg} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navbtn]} onPress={() => setActivePageKey(1)}>
          <Image source={require("./img/Settings.png")}  style={styles.navimg} />
        </TouchableOpacity>
      </View>
      {/* <Button title="Export" onPress={exportDb} /> */}
      <StatusBar style="auto" />
    </View>
  );
}
//STYLE SETTINGS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    height: "30%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  logoImg: {
    height: "70%",
    overflow: "hidden",
    objectFit: "contain"
  },
  pageContainer: {
    flex: 1,
    width: "100%"
  },
  navbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 0,
    height: "20%",
    width: "100%",
    backgroundColor: "white",
    
  },
  navbtn: {
    height: "60%",
    aspectRatio: "1/1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#f5e62e",
    position: "relative",
    overflow: "hidden"
  },
  homebtn: {
    backgroundColor: "#ff4810"
  },
  navimg: {
    height: "105%",
    overflow: "hidden",
    objectFit: "contain"
  }
});
