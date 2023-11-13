import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
// import { Trash } from 'lucide-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IconButton = ({ onPress, iconName, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={iconName} size={30} color={color} />
        {/* <Text style={{ marginLeft: 10 }}>{buttonText}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
