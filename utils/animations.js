import { useEffect } from "react";
import { useSharedValue, withRepeat, withSequence, withTiming, useAnimatedStyle } from "react-native-reanimated";

export const useCalendarAnimation = () => {
  const calendarScale = useSharedValue(1);

  useEffect(() => {
    calendarScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ scale: calendarScale.value }],
  }));
};

export const useTrophyAnimation = () => {
  const trophyY = useSharedValue(0);

  useEffect(() => {
    trophyY.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1
    );
  }, []);

  return useAnimatedStyle(() => ({
    transform: [{ translateY: trophyY.value }],
  }));
};
