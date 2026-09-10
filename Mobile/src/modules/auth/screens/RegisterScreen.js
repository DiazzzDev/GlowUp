import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import AuthInput from '../components/AuthInput';
import AuthButton from '../components/AuthButton';
import useAuth from '../hooks/useAuth';

export const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('Juan Pérez');
  const [email, setEmail] = useState('example@email.com');
  const [password, setPassword] = useState('********');
  const [telefono, setTelefono] = useState('7000-0000');
  const [fechaNac, setFechaNac] = useState('12-12-2000');
  const [direccion, setDireccion] = useState('San Salvador, El Salvador');

  const { loading, error, handleRegister } = useAuth(navigation);

  const onSubmit = () => {
    handleRegister({
      nombre,
      email,
      password,
      telefono,
      fechaNac,
      direccion,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#F0FBF9]"
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />
      
      {/* Top Bar with Back Arrow */}
      <View className="flex-row items-center px-6 pt-12 pb-4 bg-[#F0FBF9]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-white border border-[#D7EFEA] items-center justify-center mr-3"
        >
          <Text className="text-[#1A2B29] text-xl font-bold">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Regístrate</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white p-6 rounded-3xl border border-[#D7EFEA] shadow-sm mt-2">
          {error && (
            <View className="bg-[#E76F51]/10 border border-[#E76F51]/30 p-3 rounded-xl mb-4">
              <Text className="text-[#E76F51] text-xs font-semibold">{error}</Text>
            </View>
          )}

          <AuthInput
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            placeholder="Juan Pérez"
          />

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

          {/* Row for Phone and Birthdate exactly as in image */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <AuthInput
                label="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                placeholder="7000-0000"
                keyboardType="phone-pad"
              />
            </View>
            <View className="flex-1">
              <AuthInput
                label="Fecha de Nac."
                value={fechaNac}
                onChangeText={setFechaNac}
                placeholder="12-12-2000"
              />
            </View>
          </View>

          <AuthInput
            label="Dirección"
            value={direccion}
            onChangeText={setDireccion}
            placeholder="San Salvador, El Salvador"
          />

          <View className="mt-2">
            <AuthButton
              title="Inicia sesión"
              onPress={onSubmit}
              loading={loading}
            />
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center items-center mt-6">
          <Text className="text-[#1A2B29] text-sm font-medium">
            ¿Ya tienes una cuenta?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#17C3B2] text-sm font-bold">Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
