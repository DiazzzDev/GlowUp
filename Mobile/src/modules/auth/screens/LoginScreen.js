import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import useAuth from '../hooks/useAuth';

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('example@email.com');
  const [password, setPassword] = useState('12345678');
  const { loading, error, handleLogin } = useAuth(navigation);

  const onSubmit = () => {
    handleLogin(email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F0FBF9]"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View className="items-center mb-8">
          <View className="flex-row items-baseline mb-2">
            <Text className="text-[#17C3B2] text-4xl font-extrabold tracking-tight">
              Glow Up
            </Text>
            <View className="ml-2 bg-[#17C3B2]/10 px-2 py-0.5 rounded-md border border-[#17C3B2]/30">
              <Text className="text-[#17C3B2] text-xs font-bold">SV</Text>
            </View>
          </View>
          <Text className="text-[#1A2B29] text-xl font-bold mt-1">Inicia sesión</Text>
          <Text className="text-[#8C9EA0] text-sm mt-1 text-center">
            Ingresa tus credenciales para acceder a tu perfil
          </Text>
        </View>

        {/* Form Box */}
        <View className="bg-white p-6 rounded-3xl border border-[#D7EFEA] shadow-sm">
          {error && (
            <View className="bg-[#E76F51]/10 border border-[#E76F51]/30 p-3 rounded-xl mb-4">
              <Text className="text-[#E76F51] text-xs font-semibold">{error}</Text>
            </View>
          )}

          <AuthInput
            label="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
          />

          <AuthInput
            label="Contraseña"
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
          />

          <TouchableOpacity className="items-end mb-5">
            <Text className="text-[#17C3B2] text-xs font-semibold">
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          <AuthButton
            title="Inicia sesión"
            onPress={onSubmit}
            loading={loading}
          />
        </View>

        {/* Footer Link */}
        <View className="flex-row justify-center items-center mt-8">
          <Text className="text-[#1A2B29] text-sm font-medium">
            ¿No tienes cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-[#17C3B2] text-sm font-bold">Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
