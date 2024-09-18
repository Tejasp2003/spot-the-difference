import { View, Text } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/Ionicons";

const CheckedBox = () => {
  return (
    <View className="flex justify-center items-center">
      <Icon
        name="checkmark-circle"
        size={28}
        className="text-white text-center self-center"
      />
    </View>
  );
};

export default CheckedBox;
