import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const tasks = [
  { id: "1", task: "Play 5 levels", coins: 50 },
  { id: "2", task: "Login", coins: 20 },
  { id: "3", task: "Watch a video ad", coins: 30 },
  { id: "4", task: "Invite a friend", coins: 100 },
  { id: "5", task: "Complete a puzzle in under 5 minutes", coins: 70 },
  { id: "6", task: "Earn 100 points", coins: 40 },
  { id: "7", task: "Share the game on social media", coins: 60 },
  { id: "8", task: "Use 3 hints", coins: 25 },
  { id: "9", task: "Complete a level with no mistakes", coins: 80 },
  { id: "10", task: "Spin the wheel of fortune", coins: 35 },
];

const DailyTaskModal = ({ isVisible, onClose }) => {
  const renderTask = ({ item }) => (
    <View className="flex-row justify-between items-center bg-[#F9F7C6] p-2 mb-2 rounded-lg shadow-md">
      <Image
        source={require("../../assets/images/coins-frame.png")}
        className="w-16 h-16 mr-3"
      />

      <View className="flex-1 flex-col space-y-2">
        <Text className="text-lg font-JakartaBold">{item.task}</Text>

        <View className="relative">
          <Progress.Bar
            progress={0.3}
            width={150}
            color="#A8FA85"
            unfilledColor="rgba(255, 255, 255, 0.5)"
            borderColor="black"
            borderWidth={1}
            borderRadius={10}
            height={12}
          />
          <View className="absolute top-0 right-0 left-0 bottom-0 justify-center items-center">
            <Text className="text-black text-xs font-JakartaExtraBold">
              0 / 1
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="bg-[#A8FA85] rounded-3xl h-10 w-20 flex justify-center items-center ml-3"
      >
        <Text className="text-lg font-JakartaBold text-center">Free</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60 h-full">
        <View className="text-2xl font-UnlockRegular border-4 border-[#637EE1] z-10 absolute top-[50px] h-16 w-[60vw] rounded-lg bg-white text-[#07334E] !text-center my-auto flex justify-center items-center">
          <Text className="text-2xl font-UnlockRegular text-center">Daily Tasks</Text>
        </View>
        <View className="bg-[#07334E] w-[90vw] h-[80vh] rounded-[47px] p-[6px] border-[5px] border-[#FBFFB5] relative overflow-hidden">
          <View className="absolute rounded-full h-20 w-16 bg-[#FBFFB5] -top-[26px] -right-[22px] transform rotate-45 z-10"></View>
          <TouchableOpacity className="absolute top-2 right-3 text-black text-2xl z-10">
            <FontAwesome name="close" size={28} color="black" onPress={onClose} />
          </TouchableOpacity>

          <View className="mt-14">
            <FlatList
              data={tasks}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DailyTaskModal;