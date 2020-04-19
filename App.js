import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Image, StatusBar } from 'react-native';
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
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
      "https://images.unsplash.com/photo-1571847140471-1d7766e825ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=673&q=80",
      require("./assets/splash.png")
    ])
    const fonts = cashFonts([Ionicons.font, FontAwesome.font])
    return Promise.all([...images, ...fonts])
  }
  const onFinish = () => setReady(true)
  return isReady ?
    (<>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>) : (
      <AppLoading startAsync={loadAssets} onFinish={onFinish} onError={console.err}></AppLoading>
    );
}