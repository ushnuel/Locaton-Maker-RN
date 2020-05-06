import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';

const customButton = (props) => {
  return (
    <TouchableOpacity style={{ ...styles.buttonConfiguration, ...props.buttonStyle }} onPress={props.onPress}>
      <Text style={{ ...styles.text, ...props.buttonText }}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonConfiguration: {
    width: 200,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});
export default customButton;
