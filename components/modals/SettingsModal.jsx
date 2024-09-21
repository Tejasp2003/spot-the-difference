import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the settings icon
import { Slider } from "@miblanchard/react-native-slider"; // For volume and sound controls

const SettingsModal = ({ isVisible, onClose }) => {
  const animationValue = useState(new Animated.Value(0))[0];

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
            {
              backgroundColor: "white",
              width: 288,
              padding: 24,
              borderRadius: 10,
            },
            animatedStyle,
          ]}
        >
          <Text className="text-lg font-bold text-center mb-4">Settings</Text>
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-lg text-gray-700">Music</Text>
            <Ionicons name="musical-notes" size={24} color="#3498db" />
          </View>

          {/* Volume Setting */}
          <View className="mb-4">
            <Text className="mb-2 text-gray-700">Volume</Text>
            <Slider
              value={0.5}
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              thumbTintColor="#3498db"
              minimumTrackTintColor="#3498db"
              maximumTrackTintColor="#95a5a6"
            />
          </View>

          {/* Sound Setting */}
          <View className="mb-4">
            <Text className="mb-2 text-gray-700">Sound Effects</Text>
            <Slider
              value={0.7}
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              thumbTintColor="#e74c3c"
              minimumTrackTintColor="#e74c3c"
              maximumTrackTintColor="#95a5a6"
            />
          </View>

          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500 py-2 px-4 rounded-lg mt-4"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
