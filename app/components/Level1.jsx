import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Text,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";



const INITIAL_LIVES = 3;
const MAX_STARS = 3;

const ORIGINAL_IMAGE_WIDTH = 1000; // Replace with your image's actual width
const ORIGINAL_IMAGE_HEIGHT = 750; // Replace with your image's actual height

const gameLevels = [
  {
    id: 1,
    leftImage: require("../../assets/images/image-diff-1.png"),
    rightImage: require("../../assets/images/image-diff-2.jpeg"),
    differences: [
      { id: 1, x: 100, y: 277, width: 150, height: 150 },
      { id: 2, x: 600, y: 487, width: 200, height: 150 },
      { id: 3, x: 680, y: 397, width: 70, height: 52 },
      { id: 4, x: 290, y: 487, width: 60, height: 112 },
      { id: 5, x: 400, y: 337, width: 60, height: 67 },
    ],
  },
  // Add more levels as needed
];

const SpotDifferenceGame = () => {
  const [currentLevel, setCurrentLevel] = useState(gameLevels[0]);
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [developmentDifferences, setDevelopmentDifferences] = useState([]);
  const [wrongClick, setWrongClick] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [stars, setStars] = useState(MAX_STARS);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Shared values for reanimated modals
  const gameOverOpacity = useSharedValue(0);
  const levelCompletedOpacity = useSharedValue(0);
  const gameOverScale = useSharedValue(0.5);
  const levelCompletedScale = useSharedValue(0.5);

  // useEffect(() => {
  //   setDevelopmentDifferences(currentLevel.differences);
  // }, [currentLevel]);

  useEffect(() => {
    if (lives === 0) {
      setGameOver(true);
      gameOverOpacity.value = withTiming(1);
      gameOverScale.value = withSpring(1);
    } else if (foundDifferences.length === currentLevel.differences.length) {
      setLevelCompleted(true);
      levelCompletedOpacity.value = withTiming(1);
      levelCompletedScale.value = withSpring(1);
    }
  }, [lives, foundDifferences]);

  // useEffect(() => {
  //   setDevelopmentDifferences(gameLevels[0].differences);
  // }, [gameLevels[0].differences]);

  const handleImageLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setImageDimensions({ width, height });
  };

  const getScaledCoordinates = (x, y, width, height) => {
    const scaleX = imageDimensions.width / ORIGINAL_IMAGE_WIDTH;
    const scaleY = imageDimensions.height / ORIGINAL_IMAGE_HEIGHT;
    return {
      x: x * scaleX,
      y: y * scaleY,
      width: width * scaleX,
      height: height * scaleY,
    };
  };

  const handlePress = (event, isLeftImage) => {
    const { locationX, locationY } = event.nativeEvent;

    const found = currentLevel.differences.find((difference) => {
      const { x, y, width, height } = getScaledCoordinates(
        difference.x,
        difference.y,
        difference.width,
        difference.height
      );

      return (
        locationX >= x &&
        locationX <= x + width &&
        locationY >= y &&
        locationY <= y + height
      );
    });

    if (found) {
      setFoundDifferences((prev) => [...prev, found.id]);
      setWrongClick(null);
    } else {
      setWrongClick({ x: locationX, y: locationY, isLeftImage });
      setLives((prev) => Math.max(0, prev - 1));
    }
  };

  const handleHint = () => {
    if (hintsUsed < MAX_STARS) {
      const unfoundDifferences = currentLevel.differences.filter(
        (difference) => !foundDifferences.includes(difference.id)
      );

      if (unfoundDifferences.length > 0) {
        const nextDifference = unfoundDifferences[0];
        setFoundDifferences((prev) => [...prev, nextDifference.id]);
        setHintsUsed((prev) => prev + 1);
        setStars((prev) => Math.max(0, prev - 1));
      }
    }
  };
  const renderFoundDifferences = () => {
    return foundDifferences.map((differenceId) => {
      const difference = currentLevel.differences.find(
        (d) => d.id === differenceId
      );
      if (!difference) return null;

      const { x, y, width, height } = getScaledCoordinates(
        difference.x,
        difference.y,
        difference.width,
        difference.height
      );

      const style = {
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        borderWidth: 4,
        borderColor: "red",
        borderRadius: 50,
      };

      return <View key={difference.id} style={style} />;
    });
  };

  const renderDevelopmentDifferences = () => {
    return developmentDifferences.map((difference) => {
      const { x, y, width, height } = getScaledCoordinates(
        difference.x,
        difference.y,
        difference.width,
        difference.height
      );

      const style = {
        position: "absolute",
        left: x,
        top: y,
        width: width,
        height: height,
        borderWidth: 4,
        borderColor: "blue",
        borderRadius: 50,
      };

      return <View key={difference.id} style={style} />;
    });
  };

  const renderWrongClick = () => {
    if (!wrongClick) return null;

    const style = {
      position: "absolute",
      left: wrongClick.x - 10,
      top: wrongClick.y - 10,
      width: 20,
      height: 20,
    };

    return (
      <View style={style}>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 9,
            width: "100%",
            height: 2,
            backgroundColor: "red",
            transform: [{ rotate: "45deg" }],
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 9,
            width: "100%",
            height: 2,
            backgroundColor: "red",
            transform: [{ rotate: "-45deg" }],
          }}
        />
      </View>
    );
  };

  const renderDifferenceCheckboxes = () => {
    return currentLevel.differences.map((_, index) => (
      <View key={index} style={{ marginRight: 5 }}>
        <Ionicons
          name={index < foundDifferences.length ? "checkbox" : "square-outline"}
          size={24}
          color="black"
        />
      </View>
    ));
  };

  const renderStars = () => {
    return Array(MAX_STARS)
      .fill(0)
      .map((_, index) => (
        <Ionicons
          key={index}
          name={index < stars ? "star" : "star-outline"}
          size={24}
          color="black"
        />
      ));
  };

  const renderLives = () => {
    return Array(INITIAL_LIVES)
      .fill(0)
      .map((_, index) => (
        <Ionicons
          key={index}
          name={index < lives ? "heart" : "heart-outline"}
          size={24}
          color="red"
        />
      ));
  };

  const restartGame = () => {
    setLives(INITIAL_LIVES);
    setStars(MAX_STARS);
    setFoundDifferences([]);
    setHintsUsed(0);
    setLevelCompleted(false);
    setGameOver(false);
    gameOverOpacity.value = 0;
    levelCompletedOpacity.value = 0;
    gameOverScale.value = 0.5;
    levelCompletedScale.value = 0.5;
  };

  const handleNextLevel = () => {
    const nextLevelIndex =
      gameLevels.findIndex((level) => level.id === currentLevel.id) + 1;
    if (nextLevelIndex < gameLevels.length) {
      setCurrentLevel(gameLevels[nextLevelIndex]);
      restartGame();
    }
  };

  const gameOverAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: gameOverOpacity.value,
      transform: [{ scale: gameOverScale.value }],
    };
  });

  const levelCompletedAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: levelCompletedOpacity.value,
      transform: [{ scale: levelCompletedScale.value }],
    };
  });
  return (
    <SafeAreaView className="h-screen bg-[#DCD6F7] flex flex-col pt-8">
      <View className="flex-row justify-between items-center p-4">
        <Text className="text-lg font-bold">Level {currentLevel.id}</Text>
        <View className="flex-row">{renderStars()}</View>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>

      <View className="flex-row justify-center items-center p-2">
        {renderDifferenceCheckboxes()}
      </View>

      <View className="flex-1">
        <Pressable
          onPress={(e) => handlePress(e, true)}
          onLayout={handleImageLayout}
        >
          <View
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: ORIGINAL_IMAGE_WIDTH / ORIGINAL_IMAGE_HEIGHT,
            }}
          >
            <Image
              source={currentLevel.leftImage}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
            {renderFoundDifferences()}
            {renderDevelopmentDifferences()}
            {wrongClick && wrongClick.isLeftImage && renderWrongClick()}
          </View>
        </Pressable>
      </View>

      <View className="flex-1">
        <Pressable onPress={(e) => handlePress(e, false)}>
          <View
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: ORIGINAL_IMAGE_WIDTH / ORIGINAL_IMAGE_HEIGHT,
            }}
          >
            <Image
              source={currentLevel.rightImage}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
            {renderFoundDifferences()}
            {wrongClick && !wrongClick.isLeftImage && renderWrongClick()}
          </View>
        </Pressable>
      </View>

      <View className="flex-row justify-between items-center p-4">
        <View className="flex-row">{renderLives()}</View>
        <TouchableOpacity onPress={handleHint}>
          <Text className="text-blue-500 font-bold">Hint</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={gameOver} transparent animationType="fade">
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            gameOverAnimatedStyle,
          ]}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}
            >
              Game Over
            </Text>
            <Pressable
              style={{
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={restartGame}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Restart Game
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>

      <Modal visible={levelCompleted} transparent animationType="fade">
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            },
            levelCompletedAnimatedStyle,
          ]}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 24, marginBottom: 20 }}
            >
              Level Completed
            </Text>
            <Pressable
              style={{
                backgroundColor: "green",
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={handleNextLevel}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Next Level
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

export default SpotDifferenceGame;
