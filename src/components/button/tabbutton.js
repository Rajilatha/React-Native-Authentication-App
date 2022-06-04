import { View, Text } from 'react-native';
import React from 'react';

const tabbutton = ({title, btnStyle, btnTextStyle, onPress}) => {
  return (
    <TouchableOpacity style={[styles.btn, btnStyle]} onPress={onPress}>
    <Text style={[styles.text, btnTextStyle]}>{title}</Text>
  </TouchableOpacity>
  );
};


export default tabbutton;
