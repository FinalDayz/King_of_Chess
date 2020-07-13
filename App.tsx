import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Main} from "./components/Main";
import MainNavigation from "./components/navigation/MainNavigation";


export default function App() {
  // console.disableYellowBox = true;
  return (

      <MainNavigation/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
});
