import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Icon from "react-native-vector-icons/Ionicons";
  import { router } from "expo-router";
  
  const HomePage = () => {
    const [currentLevel, setCurrentLevel] = useState(1);
    return (
      <SafeAreaView className="h-full flex items-center ">
        <View className="flex items-center mt-2 ">
          {/* back button and number of coins */}
          <View className="flex flex-row items-center justify-between w-full px-4 py-2">
            <View className="flex items-center">
              <Icon name="arrow-back-circle" size={40} color="#100B30" />
            </View>
            <View
              className="flex items-center flex-row space-x-2 p-4 bg-purple-300
            rounded-full
            "
            >
              <Image
                source={require("../../assets/images/coin.png")}
                style={{ width: 30, height: 30 }}
              />
              <Text className="text-xl font-extrabold">100</Text>
              <Icon name="add-circle" size={30} color="#100B30" />
            </View>
          </View>
          <View className="flex items-center">
            <Image
              source={require("../../assets/images/main-home-image.png")}
              className="w-60 h-60"
            />
          </View>
          <View className="flex items-center w-full h-full">
            <TouchableOpacity
              className="flex items-center flex-row p-3 px-4 bg-green-200 rounded-3xl space-x-4 border-4 border-green-800 text-green-800"
              onPress={router.replace(`{/levels`)}
            >
              <Icon name="play" size={40} color="green" />
              <Text className="text-3xl font-extrabold  text-green-800">
                LEVEL {currentLevel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default HomePage;
  