import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import HomePage from './HomePage'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="home" component={HomePage} />
    </Stack>
  )
}

export default Layout