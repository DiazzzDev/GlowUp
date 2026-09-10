import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

export const WelcomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-[#17C3B2] justify-between px-6 py-12">
      <StatusBar barStyle="light-content" backgroundColor="#17C3B2" />
      
      {/* Top spacer */}
      <View className="items-center mt-20">
        <View className="bg-white/20 px-4 py-1.5 rounded-full mb-6">
          <Text className="text-white text-xs font-semibold tracking-wider uppercase">
            Skincare & Bienestar
          </Text>
        </View>

        {/* Brand Name exactly as shown in design */}
        <View className="flex-row items-baseline">
          <Text className="text-white text-5xl font-extrabold tracking-tight">
            Glow Up
          </Text>
          <View className="ml-2 bg-white/25 px-2 py-0.5 rounded-md border border-white/40">
            <Text className="text-white text-sm font-bold">SV</Text>
          </View>
        </View>

        <Text className="text-white/90 text-center text-base mt-4 px-6 font-medium leading-relaxed">
          Tu mejor versión a un solo click. Encuentra la rutina ideal para tu piel.
        </Text>
      </View>

      {/* Action Buttons from design */}
      <View className="w-full gap-3.5 mb-8">
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.85}
          className="w-full bg-[#11988A] border border-white/40 py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white text-base font-bold">Crear cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
          className="w-full bg-[#0E7A6E] border border-white/20 py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white text-base font-bold">Inicia sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs')}
          className="items-center mt-2 py-2"
        >
          <Text className="text-white/80 text-sm font-medium underline">
            Explorar catálogo como invitado
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
