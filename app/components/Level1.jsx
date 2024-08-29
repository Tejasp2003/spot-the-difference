import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckedBox from "./shared/checkedBox";
import { Audio } from 'expo-av';

const Level1 = () => {
  const [differences, setDifferences] = useState([]);
  const [score, setScore] = useState(0);
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [hints, setHints] = useState(3);
  const [wrongClick, setWrongClick] = useState(null);
  const [isWrongClickVisible, setIsWrongClickVisible] = useState(false);

  useEffect(() => {
    generateDifferences();
  }, []);

  useEffect(() => {
    if (isWrongClickVisible) {
      const timeout = setTimeout(() => {
        setIsWrongClickVisible(false);
        setWrongClick(null);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isWrongClickVisible]);

  const generateDifferences = () => {
    const newDifferences = [
      { id: 1, x: 12, y: 35, width: 5, height: 5 },
      { id: 2, x: 88, y: 70, width: 10, height: 8 },
      { id: 3, x: 68, y: 53, width: 7, height: 7 },
      { id: 4, x: 29, y: 65, width: 6, height: 9 },
      { id: 5, x: 40, y: 45, width: 6, height: 9 },
    ];
    setDifferences(newDifferences);
  };

  const playSound = async (isCorrect) => {
    // Uncomment and implement sound playing logic if needed
  };

  const handlePress2 = async (x, y) => {
    const found = differences.find(
      (diff) =>
        Math.abs(diff.x - x) < diff.width / 2 && Math.abs(diff.y - y) < diff.height / 2
    );
     if(!found){
      setWrongClick({ x, y });
      setIsWrongClickVisible(true);


     }
  };


  const handlePress = async (x, y) => {
    const found = differences.find(
      (diff) =>
        Math.abs(diff.x - x) < diff.width / 2 && Math.abs(diff.y - y) < diff.height / 2
    );
  
    if (found && !foundDifferences.some((f) => f.id === found.id)) {
      setWrongClick(null);
      setIsWrongClickVisible(false);
      setScore((prevScore) => prevScore + 1);
      setFoundDifferences((prevFound) => [...prevFound, found]);

   
    }
  };

  const useHint = () => {
    if (hints > 0 && foundDifferences.length < differences.length) {
      const notFound = differences.find(diff => !foundDifferences.some(f => f.id === diff.id));
      setFoundDifferences(prev => [...prev, notFound]);
      setHints(prev => prev - 1);
      setScore(prev => prev + 1);
    }
  };

  console.log("IsWrongClickVisible", isWrongClickVisible);
  return (
    <SafeAreaView className="h-screen bg-[#DCD6F7] flex flex-col justify-between">
      <View className="flex flex-row items-center justify-between p-2">
        <Text className="text-2xl font-bold p-2 my-4 text-[#141E46]">
          Level 1
        </Text>
        <TouchableOpacity onPress={useHint} className="bg-blue-500 p-2 rounded">
          <Text className="text-white">Hint ({hints})</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center p-2 flex-wrap">
        <Text className="text-lg font-bold p-2 text-[#141E46]">
          Differences: {foundDifferences.length}/{differences.length}
        </Text>
        {differences.map((_, index) => (
          <View key={index} className="flex flex-row items-center p-2">
            {foundDifferences[index] ? (
              <CheckedBox />
            ) : (
              <View className="w-6 h-6 border-2 border-[#141E46] rounded-lg flex items-center justify-center" />
            )}
          </View>
        ))}
      </View>

      <View className="flex flex-row justify-center">
        {[1, 2, 3].map((star) => (
          <Text key={star} className={`text-3xl ${star <= foundDifferences.length ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </Text>
        ))}
      </View>

      <View className="flex flex-col items-center justify-start p-2 rounded-xl mb-4 space-y-4">
        {[1, 2].map((imageIndex) => (
          <View key={imageIndex} className="w-full relative border-2 border-blue-500 rounded-lg">
            <Image
              source={imageIndex === 1 ? require("../../assets/images/image-diff-1.png") : require("../../assets/images/image-diff-2.jpeg")}
              className="w-full h-[300px]"
            />
            <View
              className="absolute top-0 left-0 w-full h-full"
              onTouchStart={(e) => handlePress2(e.nativeEvent.locationX, e.nativeEvent.locationY)}
            >
              {differences.map((diff) => (
                <TouchableOpacity
                  key={`${imageIndex}-${diff.id}`}
                  className="absolute rounded-full opacity-50 bg-red-500"
                  style={{
                    position: "absolute",
                    width: `${diff.width}%`,
                    height: `${diff.height}%`,
                    left: `${diff.x - diff.width / 2}%`,
                    top: `${diff.y - diff.height / 2}%`,
                  }}
                  onPress={() =>{
                   
                    handlePress(diff.x, diff.y);
                  }}
                />
              ))}
              {foundDifferences.map((diff) => (
                <View
                  key={`found-${imageIndex}-${diff.id}`}
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
              {isWrongClickVisible && wrongClick && (
                <Animated.View
                  style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    left: wrongClick.x - 15,
                    top: wrongClick.y - 15,
                    backgroundColor: "red",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0.8,
                    transform: [{ scale: 1 }],
                  }}
                >
                  <Text style={{ color: "white", fontSize: 20 }}>X</Text>
                </Animated.View>
              )}
            </View>
          </View>
        ))}
        <Text className="text-lg mt-4">Score: {score}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Level1;
