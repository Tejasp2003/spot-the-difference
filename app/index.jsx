import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [differences, setDifferences] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateDifferences();
  }, []);

  const generateDifferences = () => {
    // In a real app, you'd have a set of images with known differences
    // For this example, we'll use placeholder positions
    const newDifferences = [
      { x: 80, y: 100 },
      { x: 150, y: 200 },
      { x: 250, y: 150 },
    ];
    setDifferences(newDifferences);
  };

  const handlePress = (x, y) => {
    const found = differences.find(
      (diff) => Math.abs(diff.x - x) < 20 && Math.abs(diff.y - y) < 20
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
        <View className="flex flex-col w-full space-y-2 justify-center items-center ">
          <Image
            source={require("../assets/images/img1.png")}
            className="w-full h-[300px] rounded-lg"
          />
          <Image
            source={require("../assets/images/img1.png")}
            className="w-full h-[300px] rounded-lg"
          />

          {differences.map((diff, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.diffSpot, { left: diff.x, top: diff.y }]}
              onPress={() => handlePress(diff.x, diff.y)}
            />
          ))}
        </View>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gameArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    position: "relative",
  },
  image: {
    width: 300,
    height: 300,
  },
  diffSpot: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 0, 0, 0.5)",
  },
  score: {
    fontSize: 18,
    marginTop: 20,
  },
});
