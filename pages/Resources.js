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
  Linking
} from 'react-native';
import * as SMS from 'expo-sms'; // FOR TEXT MESSAGES
import * as Location from 'expo-location'; // FOR PHONE LOCATION
import * as ExpoLinking from 'expo-linking'; // FOR PHONE CALLS

export default function Resources({ setActivePageKey }) {

  return (
    <View style="page">
      <Text>Resources</Text>
    </View>
  );
}