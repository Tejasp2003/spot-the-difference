import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Animated as ReactNativeAnimated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { Audio } from "expo-av";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const HomePage = () => {
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.9);
  const buttonScale = useSharedValue(1);
  const settingsRotation = useSharedValue(0);

  // New shared values for continuous animations
  const spinWheelRotation = useSharedValue(0);
  const calendarScale = useSharedValue(1);
  const trophyY = useSharedValue(0);

  // New shared value for play button highlight
  const playButtonScale = useSharedValue(1);
  const playButtonOpacity = useSharedValue(0.5);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    scaleAnim.value = withSpring(1, { damping: 4 });

    // Continuous animations
    spinWheelRotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
    calendarScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );
    trophyY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );

    // Play button highlight animation
    playButtonScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800 }),
        withTiming(1, { duration: 800 })
      ),
      -1,
      true
    );
    playButtonOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.5, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };

  const animateButton = () => {
    buttonScale.value = withSequence(
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
  };

  const rotateSettingsButton = () => {
    settingsRotation.value = withTiming(settingsRotation.value + 360, {
      duration: 500,
    });
    playSound(require("../assets/sounds/click-sound.mp3")); // Adjust the path as needed
    // Here you would also add logic to open the settings modal
  };

  const mainContentStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  const dailyChallengeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  const buttonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const settingsAnimStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${settingsRotation.value}deg` }],
  }));

  const spinWheelAnimStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinWheelRotation.value}deg` }],
    //infinte rotation
  }));

  const calendarAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: calendarScale.value }],
  }));

  const trophyAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: trophyY.value }],
  }));

  const playButtonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playButtonScale.value }],
    opacity: playButtonOpacity.value,
  }));

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const shimmerAnim = useRef(new ReactNativeAnimated.Value(0)).current;

  useEffect(() => {
    ReactNativeAnimated.loop(
      ReactNativeAnimated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <ImageBackground
      source={require("../assets/images/home-bg-10.png")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Animated.View
          className="relative"
          style={[
            { flex: 1, alignItems: "center", width: "100%" },
            mainContentStyle,
          ]}
        >
          {/* Header */}
          <View className="flex flex-row items-center justify-between w-full p-4">
            <TouchableOpacity onPress={rotateSettingsButton}>
              <Animated.View
                className="bg-[#eed663] rounded-[28px] p-2"
                style={[settingsAnimStyle]}
              >
                <Icon name="settings" size={38} color="#100b30" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                className="flex flex-row items-center bg-[#a9ebd8] rounded-[28px] p-1
                border border-[#0e3b15]"
                
              >
                <Image
                  source={require("../assets/images/coin-icon.png")}
                  className="w-[38px] h-[38px] object-contain"
                />
                <Text
                  className="text-[#10442f] text-[22px] font-extrabold mx-1"
                >
                  100
                </Text>
              
                  <Icon name="add-circle" size={26} color="#000"
                
                  />
               
              </View>
            </TouchableOpacity>
          </View>

          {/* Main Image */}
          <View style={{ alignItems: "center", marginVertical: 32 }}>
            <Image
              source={require("../assets/images/main-home-image.png")}
              style={{ width: 220, height: 220 }}
            />
          </View>

          {/* Daily Challenge Image */}

          <Animated.View
            className="flex items-center  absolute top-32 left-4"
            style={[calendarAnimStyle]}
          >
            <Image
              source={require("../assets/images/daily-challenge.png")}
              className="w-[80px] h-[70px] object-contain"
              style={{ objectFit: "contain", aspectRatio: "auto" }}
            />
          </Animated.View>
          <Animated.View
            className="flex items-center  absolute top-48 right-2"
            style={[calendarAnimStyle]}
          >
            <Image
              source={require("../assets/images/daily-reward-6.png")}
              className="w-[95px] h-[95px] object-contain"
              style={{ objectFit: "contain", aspectRatio: "auto" }}
            />
          </Animated.View>
          <Animated.View
            className="flex items-center  absolute top-72 left-1"
            style={[calendarAnimStyle]}
          >
            <Image
              source={require("../assets/images/chapters-logo.png")}
              className="w-[95px] h-[95px] object-contain"
              style={{ objectFit: "contain", aspectRatio: "auto" }}
            />
          </Animated.View>

          {/* Buttons */}
          <View className="flex items-center justify-center space-y-4 mt-8 ">
            
              <TouchableOpacity
                onPress={() => {
                  animateButton();
                  setTimeout(() => router.push(`/levels/1`));
                }}
              >
                <View
                  className="flex items-center flex-row justify-center bg-[#efeb70] rounded-xl p-1 px-2 space-x-2
                border-2 border-[#0e3b15]
                "
                >
                  <Image
                    source={require("../assets/images/play-button-icon-1.png")}
                    className="w-[60px] h-[60px] object-contain"
                  />
                  <Text
                    className="text-[#143d1a] text-3xl font-extrabold
                   
                    "
                  >
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
          

            <TouchableOpacity
              style={{ width: "100%" }}
              onPress={() => {
                animateButton();

                setTimeout(() => router.push(`/levels`), 200);
              }}
            >
              <View
                className="flex items-center flex-row justify-center bg-[#fb8853] rounded-xl p-1 space-x-2 px-2
                border-2 border-[#f9f9f9]
                "
              >
                <Image
                  source={require("../assets/images/all-levels-icon.png")}
                  className="w-[50px] h-[50px] object-contain"
                />
                <Text className="text-[#0c1a36] text-xl font-extrabold">
                  All Levels
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Bottom Icons */}
          <View className="flex flex-row justify-between w-full p-4 mt-16">
            <TouchableOpacity className=" rounded-full p-2 bg-[#e9e7e6]">
              <Animated.View style={[spinWheelAnimStyle]} className="z-10">
                <Image
                  source={require("../assets/images/spin-wheel-logo.png")}
                  className="relative w-[73px] h-[73px] object-contain aspect-auto"
                />
              </Animated.View>
              {/* <Image
                  source={require("../assets/images/wheel-stand-1.png")}
                 className="absolute bottom-[10px] right-[25px] w-[40px] h-[15px] object-contain aspect-auto"
                /> */}
            </TouchableOpacity>
            <TouchableOpacity>
              <Animated.View
                style={[calendarAnimStyle]}
                className=" bg-[#4353e4] rounded-full p-1"
              >
                <Image
                  source={require("../assets/images/task-list-icon.png")}
                  className="w-[75px] h-[75px] object-contain aspect-auto"
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Animated.View
                style={[trophyAnimStyle]}
                className="p-2 bg-[#96efb9] rounded-full"
              >
                <Image
                  source={require("../assets/images/trophy-image-2.png")}
                  className="w-[70px] h-[70px] object-contain aspect-auto"
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomePage;
