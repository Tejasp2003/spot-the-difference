import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import Level1 from "../components/Level1";

const index = () => {
  const { levels } = useLocalSearchParams();

  console.log(levels);
  return <>{levels === "1" && <Level1 />}</>;
};

export default index;
