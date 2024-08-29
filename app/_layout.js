import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomePageLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
       
      </Stack>
      <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
};

export default HomePageLayout;