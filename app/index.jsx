import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [differences, setDifferences] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateDifferences();
  }, []);

  const generateDifferences = () => {
    // These values are now percentages of the image dimensions
    const newDifferences = [
      { x: 20, y: 30 },
      { x: 50, y: 60 },
      { x: 80, y: 45 },
    ];
    setDifferences(newDifferences);
  };

  const handlePress = (x, y) => {
    const found = differences.find(
      (diff) => Math.abs(diff.x - x) < 5 && Math.abs(diff.y - y) < 5
    );
    if (found) {
      setScore((prevScore) => prevScore + 1);
      setDifferences((prevDiffs) => prevDiffs.filter((diff) => diff !== found));
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
            source={require("../assets/images/img1.png")}
            className="w-full h-full rounded-lg"
          />
          <View className="absolute top-0 left-0 w-full h-full">
            {differences.map((diff, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  position: 'absolute',
                  width: '5%',
                  height: '5%',
                  left: `${diff.x}%`,
                  top: `${diff.y}%`,
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  borderRadius: 9999,
                }}
                onPress={() => handlePress(diff.x, diff.y)}
              />
            ))}
          </View>
        </View>
        <View className="w-full aspect-square mt-2">
          <Image
            source={require("../assets/images/img1.png")}
            className="w-full h-full rounded-lg"
          />
        </View>
        <Text className="text-lg mt-4">Score: {score}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;