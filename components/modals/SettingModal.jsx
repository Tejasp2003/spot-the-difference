import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  ImageBackground,
  Switch,
} from "react-native";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons"; // For the settings icons
import { Slider } from "@miblanchard/react-native-slider"; // For volume and sound controls

const SettingsModal = ({ isVisible, onClose }) => {
  const animationValue = useState(new Animated.Value(0))[0];

  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const animatedStyle = {
    transform: [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      {
        rotateX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["90deg", "0deg"],
        }),
      },
    ],
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <Animated.View
          style={[
            // {
            //   backgroundColor: 'white',
            //   width: 288,
            //   padding: 24,
            //   borderRadius: 10,
            // },
            animatedStyle,
          ]}
          className="bg-white w-[80vw]  rounded-lg p-4 "
        >
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* Row for Sound, Music, and Share */}

          {/* Sound */}
          <TouchableOpacity
            onPress={() => setSoundEnabled(!soundEnabled)}
            className=" flex  w-full  flex-row items-center justify-between px-4  rounded-lg"
          >
            <View className="flex flex-row items-center space-x-3">
              <MaterialIcons
                name={soundEnabled ? "volume-up" : "volume-off"}
                size={30}
                color={soundEnabled ? "#e74c3c" : "#ccc"}
              />
              <Text className=" text-xl  text-gray-700 font-UnlockRegular">Sound</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              className="ml-4"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMusicEnabled(!musicEnabled)}
            className=" flex  w-full  flex-row items-center justify-between px-4   rounded-lg"
          >
            <View className="flex flex-row items-center space-x-4  ">
              <Ionicons
                name={musicEnabled ? "musical-notes" : "musical-notes-outline"}
                size={24}
                color={musicEnabled ? "#3498db" : "#ccc"}
              />
              <Text className=" text-xl font-UnlockRegular text-gray-700">Music</Text>
            </View>
            <Switch
              value={musicEnabled}
              onValueChange={setMusicEnabled}
              className="ml-4"
            />
          </TouchableOpacity>

          <View className="flex flex-row justify-between items-center mb-6 mt-4">
            <TouchableOpacity className="items-center justify-center p-2 h-20 w-20 bg-blue-500 rounded-lg">
              <Image
                source={require("../../assets/images/remove-ads-icon.png")}
                className="w-10 h-10"
              />

              <Text className="mt-2 text-white font-UnlockRegular text-balance text-center ">
                No Ads
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center p-3 h-20 w-20 bg-green-400 rounded-lg">
              <AntDesign name="like2" size={30} color="#27374D" />

              <Text className="mt-2 text-[#27374D] font-UnlockRegular text-balance text-center ">
                Rate Us
              </Text>
            </TouchableOpacity>

            {/* Share */}
            <TouchableOpacity className="items-center justify-center p-4 h-20 bg-orange-100 rounded-lg w-20">
              <Entypo name="share" size={30} color="#2ecc71" />
              <Text className="mt-2 font-UnlockRegular text-gray-700">Share</Text>
            </TouchableOpacity>
          </View>

          {/* Restart Game Button */}
          <TouchableOpacity className="bg-red-500 py-3 mb-4 rounded-lg flex flex-row justify-between items-center  px-4">
            <Ionicons name="refresh" size={24} color="white" />
            <Text className="text-white text-lg ml-2 font-UnlockRegular" >Reset Game</Text>
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity>
            <Text className="text-center text-lg text-gray-600 font-UnlockRegular underline">
              Terms and conditions
            </Text>
          </TouchableOpacity>

          {/* Close Button */}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
