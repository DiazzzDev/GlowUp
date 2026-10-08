import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SKIN_TIPS } from '../../../constants/mockData';

export const SkinTipsScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="flex-row items-center px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full bg-white border border-[#D7EFEA] items-center justify-center mr-3"
        >
          <Text className="text-[#1A2B29] text-lg font-bold">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Skin Tips</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
      >
        <Text className="text-[#8C9EA0] text-sm mb-4">
          Aprende el orden correcto y los pasos indispensables para cuidar la barrera de tu piel.
        </Text>

        {SKIN_TIPS.map((tip) => (
          <View
            key={tip.id}
            className="bg-white border border-[#D7EFEA] rounded-3xl p-5 mb-4 shadow-xs"
          >
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                <View className="w-9 h-9 rounded-xl bg-[#E0F7F5] items-center justify-center mr-2.5">
                  <Text className="text-[#17C3B2] text-sm font-extrabold">{tip.step}</Text>
                </View>
                <Text className="text-[#1A2B29] text-base font-bold">{tip.title}</Text>
              </View>
              <View className="bg-[#17C3B2]/10 px-2.5 py-1 rounded-full">
                <Text className="text-[#17C3B2] text-xs font-semibold">{tip.tag}</Text>
              </View>
            </View>
            <Text className="text-[#8C9EA0] text-sm leading-relaxed mt-1">
              {tip.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SkinTipsScreen;
