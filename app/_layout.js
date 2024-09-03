import React from "react";
import { Stack } from "expo-router";


const HomePageLayout = () => {
  return (
   
      <Stack
      screenOptions={{
        headerShown: false,
        statusBarHidden: true,
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
    
   
  );
};

export default HomePageLayout;