import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';

export const MenuItemRow = ({
  icon,
  label,
  onPress,
  isSwitch = false,
  switchValue = false,
  onSwitchChange,
  badge = null,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={isSwitch ? 1 : 0.7}
      onPress={isSwitch ? undefined : onPress}
      className="flex-row items-center justify-between bg-white border border-[#D7EFEA] rounded-2xl px-4 py-3.5 mb-2.5 shadow-xs"
    >
      <View className="flex-row items-center">
        {icon ? <Text className="text-base mr-3">{icon}</Text> : null}
        <Text className="text-[#1A2B29] text-sm font-semibold">{label}</Text>
      </View>

      {isSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#D7EFEA', true: '#17C3B2' }}
          thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <View className="flex-row items-center">
          {badge ? (
            <Text className="text-[#8C9EA0] text-xs mr-2">{badge}</Text>
          ) : null}
          <Text className="text-[#8C9EA0] text-lg font-bold">›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default MenuItemRow;
