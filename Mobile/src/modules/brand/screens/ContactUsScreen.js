import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export const ContactUsScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (nombre && mensaje) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setNombre('');
        setMensaje('');
      }, 3000);
    }
  };

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
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Contáctanos</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
      >
        <View className="bg-white border border-[#D7EFEA] rounded-3xl p-6 shadow-xs">
          <Text className="text-[#1A2B29] text-base font-bold mb-2">
            Estamos para ayudarte
          </Text>
          <Text className="text-[#8C9EA0] text-xs leading-relaxed mb-5">
            ¿Tienes dudas sobre tu rutina o pedido? Escríbenos y un asesor dermatológico te responderá a la brevedad.
          </Text>

          {sent && (
            <View className="bg-[#E0F7F5] border border-[#17C3B2] p-3 rounded-xl mb-4">
              <Text className="text-[#17C3B2] text-xs font-bold text-center">
                ¡Mensaje enviado con éxito! Te contactaremos pronto.
              </Text>
            </View>
          )}

          <Text className="text-[#1A2B29] text-xs font-bold mb-1.5">Tu Nombre</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej. Ana Gómez"
            className="bg-[#F0FBF9] border border-[#D7EFEA] rounded-xl px-3.5 py-2.5 text-xs text-[#1A2B29] mb-4"
          />

          <Text className="text-[#1A2B29] text-xs font-bold mb-1.5">Mensaje o Consulta</Text>
          <TextInput
            value={mensaje}
            onChangeText={setMensaje}
            placeholder="¿Cómo te podemos ayudar hoy?"
            multiline
            numberOfLines={4}
            className="bg-[#F0FBF9] border border-[#D7EFEA] rounded-xl px-3.5 py-2.5 text-xs text-[#1A2B29] mb-5 h-24"
            textAlignVertical="top"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full bg-[#17C3B2] py-3.5 rounded-2xl items-center"
          >
            <Text className="text-white text-sm font-bold">Enviar Consulta</Text>
          </TouchableOpacity>
        </View>

        {/* Contact info channels */}
        <View className="mt-5 p-4 bg-white border border-[#D7EFEA] rounded-2xl">
          <Text className="text-[#1A2B29] text-xs font-bold mb-2">Canales de atención directa:</Text>
          <Text className="text-[#8C9EA0] text-xs mb-1">📱 WhatsApp: +503 7000-0000</Text>
          <Text className="text-[#8C9EA0] text-xs mb-1">✉️ Email: soporte@glowup.sv</Text>
          <Text className="text-[#8C9EA0] text-xs">📍 San Salvador, El Salvador</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;
