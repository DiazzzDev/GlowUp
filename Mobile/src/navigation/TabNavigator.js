import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import HomeScreen from '../modules/home/screens/HomeScreen';
import SearchProductsScreen from '../modules/products/screens/SearchProductsScreen';
import CartScreen from '../modules/cart/screens/CartScreen';
import OrdersScreen from '../modules/orders/screens/OrdersScreen';
import MenuScreen from '../modules/menu/screens/MenuScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#17C3B2',
        tabBarInactiveTintColor: '#8C9EA0',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#D7EFEA',
          borderTopWidth: 1,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: 18, fontWeight: focused ? 'bold' : 'normal' }}>
              🏠
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchProductsScreen}
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: 18, fontWeight: focused ? 'bold' : 'normal' }}>
              🔍
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          tabBarLabel: 'Carrito',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: 18, fontWeight: focused ? 'bold' : 'normal' }}>
              🛒
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="OrdersTab"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Mis pedidos',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: 18, fontWeight: focused ? 'bold' : 'normal' }}>
              📋
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="MenuTab"
        component={MenuScreen}
        options={{
          tabBarLabel: 'Más',
          tabBarIcon: ({ color, focused }) => (
            <Text style={{ color, fontSize: 18, fontWeight: focused ? 'bold' : 'normal' }}>
              ⚙️
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
