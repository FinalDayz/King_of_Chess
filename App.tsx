import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Main} from "./components/Main";
import MainNavigation from "./components/navigation/MainNavigation";


export default function App() {
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
