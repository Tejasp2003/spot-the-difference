import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [differences, setDifferences] = useState([]);
  const [score, setScore] = useState(0);
  const [foundDifferences, setFoundDifferences] = useState([]);

  useEffect(() => {
    generateDifferences();
  }, []);

  const generateDifferences = () => {
    const newDifferences = [
      { x: 12, y: 35, width: 20, height: 20 },
      { x: 88, y: 70, width: 10, height: 8 },
      { x: 68, y: 53, width: 7, height: 7 },
      { x: 29, y: 65, width: 6, height: 9 },
    ];
    setDifferences(newDifferences);
  };

  const handlePress = (x, y, width, height) => {
    const found = differences.find(
      (diff) =>
        Math.abs(diff.x - x) < width / 2 &&
        Math.abs(diff.y - y) < height / 2
    );
    if (found) {
      setScore((prevScore) => prevScore + 1);
      setDifferences((prevDiffs) => prevDiffs.filter((diff) => diff !== found));
      setFoundDifferences((prevFound) => [...prevFound, found]);
    }
  };

  return (
    <SafeAreaView className="p-2">
      <View className="flex flex-col items-center justify-start">
        <Text className="text-2xl font-bold text-center mb-4">
          Spot the Difference
        </Text>
        <View className="w-full aspect-square relative">
          <Image
            source={require("../assets/images/image-diff-1.png")}
            className="w-full h-[300px] rounded-lg"
          />
          <View className="absolute top-0 left-0 w-full h-full">
            {differences.map((diff, index) => (
              <TouchableOpacity
                className="absolute rounded-full opacity-50"
                key={index}
                style={{
                  position: "absolute",
                  width: `${diff.width}%`,
                  height: `${diff.height}%`,
                  left: `${diff.x - diff.width / 2}%`,
                  top: `${diff.y - diff.height / 2}%`,
                  backgroundColor: [
                    "red",
                    "blue",
                    "green",
                    "cyan",
                  ][index % 4],
                }}
                onPress={() => handlePress(diff.x, diff.y, diff.width, diff.height)}
              />
            ))}
            {foundDifferences.map((diff, index) => (
              <View
                key={`found-${index}`}
                style={{
                  position: "absolute",
                  width: `${diff.width * 1.5}%`,
                  height: `${diff.height * 1.5}%`,
                  left: `${diff.x - (diff.width * 1.5) / 2}%`,
                  top: `${diff.y - (diff.height * 1.5) / 2}%`,
                  borderWidth: 2,
                  borderColor: "yellow",
                  borderRadius: 9999,
                }}
              />
            ))}
          </View>
        </View>
        <View className="w-full object-contain">
          <Image
            source={require("../assets/images/image-diff-2.jpeg")}
            className="w-full h-[300px] rounded-lg"
          />
        </View>
        <Text className="text-lg mt-4">Score: {score}</Text>
      </View>
      <Pressable
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
        onPress={()=>{
          router.push("/levels/1");
        }}
      >
        <Text>Go to Level</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Index;