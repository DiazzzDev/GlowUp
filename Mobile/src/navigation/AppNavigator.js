import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import WelcomeScreen from '../modules/auth/screens/WelcomeScreen';
import LoginScreen from '../modules/auth/screens/LoginScreen';
import RegisterScreen from '../modules/auth/screens/RegisterScreen';
import VerifyCodeScreen from '../modules/auth/screens/VerifyCodeScreen';
import ProductDetailScreen from '../modules/products/screens/ProductDetailScreen';
import CategoriesScreen from '../modules/categories/screens/CategoriesScreen';
import CheckoutScreen from '../modules/checkout/screens/CheckoutScreen';
import OrderSuccessScreen from '../modules/checkout/screens/OrderSuccessScreen';
import SkinTipsScreen from '../modules/skintips/screens/SkinTipsScreen';
import SurveyScreen from '../modules/survey/screens/SurveyScreen';
import AboutUsScreen from '../modules/brand/screens/AboutUsScreen';
import ContactUsScreen from '../modules/brand/screens/ContactUsScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Auth Flow */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />

      {/* Main Tab App */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />

      {/* Stack Details & Modals */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
      <Stack.Screen name="SkinTips" component={SkinTipsScreen} />
      <Stack.Screen name="Survey" component={SurveyScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
