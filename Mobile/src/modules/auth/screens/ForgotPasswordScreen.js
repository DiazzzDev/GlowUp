import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AuthButton from '../components/AuthButton';
import useAuth from '../hooks/useAuth';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [requested, setRequested] = useState(false);
  const { loading, error, handleForgotPassword, handleResetPassword } = useAuth(navigation);
  const requestCode = async () => { if (await handleForgotPassword(email)) setRequested(true); };
  const reset = async () => { if (await handleResetPassword(code, password)) navigation.replace('Login'); };
  return <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-[#F0FBF9] justify-center px-6">
    <View className="bg-white p-6 rounded-3xl border border-[#D7EFEA]">
      <Text className="text-[#1A2B29] text-2xl font-extrabold mb-2">Recupera tu contraseña</Text>
      <Text className="text-[#8C9EA0] text-sm mb-5">{requested ? 'Ingresa el código recibido y tu nueva contraseña.' : 'Te enviaremos un código al correo registrado.'}</Text>
      {error ? <Text className="text-[#E76F51] text-xs mb-3">{error}</Text> : null}
      {!requested ? <><TextInput value={email} onChangeText={setEmail} placeholder="Correo electrónico" keyboardType="email-address" autoCapitalize="none" className="border border-[#D7EFEA] rounded-xl p-3 mb-4" /><AuthButton title="Enviar código" onPress={requestCode} loading={loading} /></> : <><TextInput value={code} onChangeText={setCode} placeholder="Código de 6 caracteres" autoCapitalize="none" className="border border-[#D7EFEA] rounded-xl p-3 mb-3" /><TextInput value={password} onChangeText={setPassword} placeholder="Nueva contraseña (mínimo 8)" secureTextEntry className="border border-[#D7EFEA] rounded-xl p-3 mb-4" /><AuthButton title="Actualizar contraseña" onPress={reset} loading={loading} /></>}
      <TouchableOpacity onPress={() => navigation.goBack()} className="items-center mt-5"><Text className="text-[#17C3B2] font-bold">Volver</Text></TouchableOpacity>
    </View>
  </KeyboardAvoidingView>;
};

export default ForgotPasswordScreen;
