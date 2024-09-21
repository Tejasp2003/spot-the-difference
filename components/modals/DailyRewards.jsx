import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DailyRewardModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={!isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 items-center justify-center bg-black/60">
        <View className="flex flex-row">
          <View className="top-[0.6vh] z-10 p-2 px-5 bg-[#07334E] border-4 border-[#F9f7c6] relative rounded-t-3xl border-b-0">
            <Text className="text-3xl font-bold text-white text-center">
              Daily Reward
            </Text>
          </View>
          <View
            className="absolute z-10 -right-[20vw] top-[4vh] p-2 w-14 h-14 bg-[#07334E] border-4 border-[#F9f7c6] rounded-full"
            onPress={onClose}
          >
            <Text className="text-3xl font-bold text-white text-center">X</Text>
          </View>
        </View>
        <View className="bg-[#07334E] rounded-[47px] flex flex-col p-6 w-[98vw] items-center border-4 border-[#f9f7c6]">
          <View className="flex flex-col gap-y-3 w-full items-center justify-center">
            <View className="flex flex-row justify-center space-x-3 w-full mt-10">
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-[27vw] items-center">
                <Text className="text-[#07334E] text-center text-2xl font-bold">
                  Day 1
                </Text>
                <ImageBackground
                  source={require("../../assets/images/coin_frame.png")}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-10 h-10"
                  />
                </ImageBackground>
              </View>
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-[27vw] items-center">
                <Text className="text-[#07334E] text-center text-2xl font-bold">
                  Day 2
                </Text>
                <ImageBackground
                  source={require("../../assets/images/coin_frame.png")}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-10 h-10"
                  />
                </ImageBackground>
              </View>
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-[27vw] items-center">
                <Text className="text-[#07334E] text-center text-2xl font-bold">
                  Day 3
                </Text>
                <ImageBackground
                  source={require("../../assets/images/coin_frame.png")}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-10 h-10"
                  />
                </ImageBackground>
              </View>
            </View>
            <View className="flex flex-row justify-center space-x-3 w-full">
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-[27vw] items-center">
                <Text className="text-[#07334E] text-center text-2xl font-bold">
                  Day 4
                </Text>
                <ImageBackground
                  source={require("../../assets/images/coin_frame.png")}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-10 h-10"
                  />
                </ImageBackground>
              </View>
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-[27vw] items-center">
                <Text className="text-[#07334E] text-center text-2xl font-bold">
                  Day 5
                </Text>
                <ImageBackground
                  source={require("../../assets/images/coin_frame.png")}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-10 h-10"
                  />
                </ImageBackground>
              </View>
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-[27vw] items-center">
                <Text className="text-[#07334E] text-center text-2xl font-bold">
                  Day 6
                </Text>
                <ImageBackground
                  source={require("../../assets/images/coin_frame.png")}
                  className="w-24 h-24 flex items-center justify-center"
                >
                  <Image
                    source={require("../../assets/images/coin.png")}
                    className="w-10 h-10"
                  />
                </ImageBackground>
              </View>
            </View>
            <View className="flex flex-row w-[100%]">
              <View className="bg-[#F9F7C6] rounded-lg p-2 w-full">
                <View className="text-center">
                  <Text className="text-[#07334E] text-center text-2xl font-bold">
                    Day 7
                  </Text>
                </View>
                <View className="flex flex-row justify-between">
                  <ImageBackground
                    source={require("../../assets/images/coin_frame.png")}
                    className="w-20 h-20 flex items-center justify-center"
                  >
                    <Image
                      source={require("../../assets/images/coin.png")}
                      className="w-10 h-10"
                    />
                  </ImageBackground>
                  <Text className="my-auto text-4xl text-[#07334E]">+</Text>
                  <ImageBackground
                    source={require("../../assets/images/coin_frame.png")}
                    className="w-20 h-20 flex items-center justify-center"
                  >
                    <Image
                      source={require("../../assets/images/coin.png")}
                      className="w-10 h-10"
                    />
                  </ImageBackground>
                  <Text className="my-auto text-4xl text-[#07334E]">+</Text>
                  <ImageBackground
                    source={require("../../assets/images/coin_frame.png")}
                    className="w-20 h-20 flex items-center justify-center"
                  >
                    <Image
                      source={require("../../assets/images/coin.png")}
                      className="w-10 h-10"
                    />
                  </ImageBackground>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default DailyRewardModal;
