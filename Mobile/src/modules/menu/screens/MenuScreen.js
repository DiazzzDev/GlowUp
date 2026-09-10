import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import MenuItemRow from '../components/MenuItemRow';
import useMenu from '../hooks/useMenu';

export const MenuScreen = ({ navigation }) => {
  const { darkMode, toggleDarkMode, language } = useMenu();

  const handleLogout = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <Text className="text-[#1A2B29] text-2xl font-extrabold mb-1">
          Menu
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        {/* Main Settings Group */}
        <MenuItemRow
          icon="👤"
          label="Cuenta"
          onPress={() => {}}
        />

        <MenuItemRow
          icon="🌐"
          label="Idioma"
          badge={language}
          onPress={() => {}}
        />

        <MenuItemRow
          icon="🌙"
          label="Modo oscuro"
          isSwitch
          switchValue={darkMode}
          onSwitchChange={toggleDarkMode}
        />

        <MenuItemRow
          icon="📦"
          label="Historial de pedidos"
          onPress={() => navigation.navigate('OrdersTab')}
        />

        {/* Public Sections from Web Repo */}
        <View className="my-2">
          <Text className="text-[#8C9EA0] text-xs font-bold uppercase tracking-wider mb-2 ml-1">
            Descubre Glow Up
          </Text>

          <MenuItemRow
            icon="💡"
            label="Consejos de la piel (Skin Tips)"
            onPress={() => navigation.navigate('SkinTips')}
          />

          <MenuItemRow
            icon="📝"
            label="Test de rutina ideal (Encuesta)"
            onPress={() => navigation.navigate('Survey')}
          />

          <MenuItemRow
            icon="ℹ️"
            label="Quiénes somos (About Us)"
            onPress={() => navigation.navigate('AboutUs')}
          />

          <MenuItemRow
            icon="✉️"
            label="Contáctanos (Contact Us)"
            onPress={() => navigation.navigate('ContactUs')}
          />
        </View>

        <View className="h-px bg-[#D7EFEA] my-3" />

        {/* Account actions from design */}
        <MenuItemRow
          icon="🔄"
          label="Cambiar de cuenta"
          onPress={() => navigation.navigate('Login')}
        />

        {/* Cerrar sesión exactly as in user image: Red box/outline */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-white border-2 border-[#E76F51] rounded-2xl p-4 mt-2 shadow-xs"
        >
          <Text className="text-[#E76F51] text-base font-bold mr-2">🚪</Text>
          <Text className="text-[#E76F51] text-sm font-bold">Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
