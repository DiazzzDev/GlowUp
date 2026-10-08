import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useApp } from '../../../context/AppContext';
import { updateProfileAction } from '../actions/profileActions';
import { EMAIL_PATTERN } from '../../../utils/validation';

export const ProfileScreen = ({ navigation }) => {
  const { customer, setCustomer } = useApp();
  const [firstName, setFirstName] = useState(customer?.firstName || '');
  const [lastName, setLastName] = useState(customer?.lastName || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [email, setEmail] = useState(customer?.email || '');
  const save = async () => {
    if (![firstName, lastName, phone, email].every((value) => value.trim()) || !EMAIL_PATTERN.test(email)) return Alert.alert('Datos inválidos', 'Completa todos los campos y usa un correo válido.');
    try { const updated = await updateProfileAction(customer.id, { firstName, lastName, phone, email }); setCustomer({ ...customer, ...updated, id: updated._id || customer.id }); Alert.alert('Perfil actualizado'); navigation.goBack(); } catch (error) { Alert.alert('No se pudo actualizar', error.message); }
  };
  return <ScrollView className="flex-1 bg-[#F0FBF9] px-6 pt-16"><Text className="text-2xl font-extrabold text-[#1A2B29] mb-6">Mi perfil</Text>{[['Nombre', firstName, setFirstName], ['Apellido', lastName, setLastName], ['Teléfono', phone, setPhone], ['Correo', email, setEmail]].map(([label, value, setter]) => <View key={label} className="mb-4"><Text className="text-sm font-bold mb-1">{label}</Text><TextInput value={value} onChangeText={setter} autoCapitalize={label === 'Correo' ? 'none' : 'words'} keyboardType={label === 'Correo' ? 'email-address' : 'default'} className="bg-white border border-[#D7EFEA] rounded-xl p-3" /></View>)}<TouchableOpacity onPress={save} className="bg-[#17C3B2] p-4 rounded-2xl items-center"><Text className="text-white font-bold">Guardar cambios</Text></TouchableOpacity></ScrollView>;
};
export default ProfileScreen;
