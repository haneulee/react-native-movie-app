import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";

const casheImages = (images) => images.map(image => {
  if (typeof image === "string") {
    return Image.prefetch(image);
  } else {
    return Asset.fromModule(image).downloadAsync();
  }
})

const cashFonts = (fonts) => fonts.map(font => [Font.loadAsync(font), Font.loadAsync(font)])

export default function App() {
  const [isReady, setReady] = useState(false);

  const loadAssets = async () => {
    const images = casheImages([
      "https://images.unsplash.com/photo-1584486188544-dc2e1417aff1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      require("./assets/splash.png")
    ])
    const fonts = cashFonts([Ionicons.font])
    return Promise.all([...images, ...fonts])
  }
  const onFinish = () => setReady(true)
  return isReady ?
    (<NavigationContainer>
      <Stack />
    </NavigationContainer>) : (
      <AppLoading startAsync={loadAssets} onFinish={onFinish} onError={console.err}></AppLoading>
    );
}