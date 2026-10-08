import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';

export const AboutUsScreen = ({ navigation }) => {
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
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Quiénes Somos</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
      >
        <View className="bg-white border border-[#D7EFEA] rounded-3xl p-6 mb-4 shadow-xs">
          <Text className="text-[#17C3B2] text-xs font-bold uppercase tracking-wider mb-2">
            Nuestra Esencia
          </Text>
          <Text className="text-[#1A2B29] text-xl font-extrabold mb-3">
            Glow Up El Salvador
          </Text>
          <Text className="text-[#8C9EA0] text-sm leading-relaxed mb-4">
            Nacimos con la misión de democratizar el acceso al skincare dermatológico y de alta calidad en El Salvador, brindando asesoría cercana y productos 100% auténticos.
          </Text>
        </View>

        {/* Pilares */}
        {[
          { title: 'Calidad Curada', text: 'Seleccionamos las marcas dermatológicas más prestigiosas del mundo.' },
          { title: 'Seguridad y Confianza', text: 'Productos 100% originales con registro sanitario verificado.' },
          { title: 'Accesibilidad Local', text: 'Envíos a todo El Salvador con entregas rápidas y seguras.' },
        ].map((item, idx) => (
          <View
            key={idx}
            className="bg-white border border-[#D7EFEA] rounded-2xl p-4 mb-3 shadow-xs"
          >
            <Text className="text-[#17C3B2] text-sm font-bold mb-1">
              ✓ {item.title}
            </Text>
            <Text className="text-[#8C9EA0] text-xs leading-relaxed">
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AboutUsScreen;
