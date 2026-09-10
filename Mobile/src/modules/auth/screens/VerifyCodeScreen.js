import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import AuthButton from '../components/AuthButton';
import useAuth from '../hooks/useAuth';

export const VerifyCodeScreen = ({ route, navigation }) => {
  const email = route?.params?.email || 'usuario@glowup.sv';
  const [code, setCode] = useState(['', '', '', '']);
  const { loading, error, handleVerifyCode } = useAuth(navigation);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const onSubmit = () => {
    handleVerifyCode(email, code.join(''));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F0FBF9] px-6 py-12 justify-center"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      <View className="bg-white p-6 rounded-3xl border border-[#D7EFEA] shadow-sm">
        <Text className="text-[#1A2B29] text-2xl font-extrabold text-center mb-2">
          Verifica tu cuenta
        </Text>
        <Text className="text-[#8C9EA0] text-sm text-center mb-6 px-2">
          Ingresa el código de 4 dígitos que enviamos a {email}
        </Text>

        {error && (
          <View className="bg-[#E76F51]/10 border border-[#E76F51]/30 p-3 rounded-xl mb-4">
            <Text className="text-[#E76F51] text-xs font-semibold text-center">{error}</Text>
          </View>
        )}

        {/* 4 digit boxes */}
        <View className="flex-row justify-center gap-3 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              maxLength={1}
              keyboardType="number-pad"
              value={code[index]}
              onChangeText={(text) => handleCodeChange(text, index)}
              className="w-14 h-14 bg-[#F0FBF9] border border-[#D7EFEA] rounded-2xl text-center text-2xl font-bold text-[#1A2B29]"
            />
          ))}
        </View>

        <AuthButton
          title="Verificar código"
          onPress={onSubmit}
          loading={loading}
        />

        <TouchableOpacity className="items-center mt-6">
          <Text className="text-[#17C3B2] text-sm font-semibold">
            ¿No recibiste el código? Reenviar
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyCodeScreen;
