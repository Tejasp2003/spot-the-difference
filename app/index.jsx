import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Custom icon component
const Icon = ({ name, size = 24, color = "white" }) => {
  // You would replace this with actual icon implementations
  return (
    <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 }} />
  );
};

const SpotDifferenceHome = () => {
  return (
    <View className="flex-1 bg-purple-900 p-4">
      {/* Top bar */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center bg-orange-400 rounded-full px-2 py-1">
          <Text className="text-white mr-1">52.00</Text>
          <TouchableOpacity>
            <Icon name="plus" size={20} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center bg-green-500 rounded-full px-2 py-1">
          <Text className="text-white mr-1">2.49</Text>
          <TouchableOpacity>
            <Icon name="plus" size={20} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center">
          <Text className="text-white mr-1">60005</Text>
          <Text className="text-yellow-400">★</Text>
        </View>
      </View>

      {/* Main content */}
      <View className="bg-purple-800 rounded-lg p-4">
        <Text className="text-white text-2xl font-bold mb-4 text-center">Spot the Difference</Text>
        
        <View className="grid grid-cols-3 gap-4">
          {/* Settings */}
          <TouchableOpacity className="bg-orange-400 rounded-lg p-2 items-center">
            <Icon name="cog" size={32} />
            <Text className="text-white mt-1">Settings</Text>
          </TouchableOpacity>

          {/* Current Level */}
          <TouchableOpacity className="bg-green-500 rounded-lg p-2 items-center">
            <Icon name="play" size={32} />
            <Text className="text-white mt-1">Current Level</Text>
          </TouchableOpacity>

          {/* Spin Wheel */}
          <TouchableOpacity className="bg-blue-500 rounded-lg p-2 items-center">
            <Icon name="gift" size={32} />
            <Text className="text-white mt-1">Spin Wheel</Text>
          </TouchableOpacity>

          {/* Effects */}
          <TouchableOpacity className="bg-purple-600 rounded-lg p-2 items-center">
            <Icon name="award" size={32} />
            <Text className="text-white mt-1">Effects</Text>
          </TouchableOpacity>

          {/* Challenges */}
          <TouchableOpacity className="bg-yellow-500 rounded-lg p-2 items-center">
            <Icon name="gift" size={32} />
            <Text className="text-white mt-1">Challenges</Text>
          </TouchableOpacity>

          {/* Hints */}
          <TouchableOpacity className="bg-red-500 rounded-lg p-2 items-center">
            <Icon name="help-circle" size={32} />
            <Text className="text-white mt-1">Hints</Text>
          </TouchableOpacity>
        </View>

        {/* Play button */}
        <TouchableOpacity className="bg-green-500 rounded-full py-3 px-6 mt-6">
          <Text className="text-white text-xl font-bold text-center">PLAY</Text>
        </TouchableOpacity>

        {/* Explore more levels */}
        <TouchableOpacity className="flex-row justify-center items-center mt-4">
          <Text className="text-white mr-2">Explore more levels</Text>
          <Icon name="chevron-right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpotDifferenceHome;