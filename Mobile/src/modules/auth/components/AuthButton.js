import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export const AuthButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'outline' | 'danger'
  loading = false,
  className = '',
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'outline':
        return 'bg-transparent border-2 border-[#17C3B2]';
      case 'danger':
        return 'bg-[#E76F51] border-0';
      case 'primary':
      default:
        return 'bg-[#17C3B2] border-0';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
        return 'text-[#17C3B2]';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      className={`w-full py-3.5 px-6 rounded-2xl flex-row justify-center items-center shadow-sm ${getButtonStyles()} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#17C3B2' : '#FFFFFF'} />
      ) : (
        <Text className={`text-base font-bold text-center tracking-wide ${getTextStyles()}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AuthButton;
