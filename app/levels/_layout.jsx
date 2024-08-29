
import React from 'react'
import { Slot, Stack } from 'expo-router'


const _layout = () => {
  return (
   
    
   <Stack
   screenOptions={{
        headerShown: false,
        animation: "fade",

        


   }}

    name="index"
    component={require("../components/Level1").default}
    style={{ flex: 1 }}
   />
  
  )
}

export default _layout
