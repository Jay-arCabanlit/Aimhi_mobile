import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type, disable}) => {
  console.log(disable);
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        {opacity: disable == true ? 0.5 : 1},
      ]}
      disabled={disable}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    height: 37,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    fontWeight: 'normal',
  },
  container_PRIMARY: {
    backgroundColor: '#549764',
  },
  container_DANGER: {
    backgroundColor: '#b42a19',
  },

  container_PRIMARY_OUTLINE: {
    borderColor: '#549764',
    borderWidth: 1,
  },
  container_SECONDARY: {
    backgroundColor: '#351D75',
  },
  container_DARK: {
    backgroundColor: '#25303C',
  },
  container_TERTIARY: {},
  container_LINK: {},
  text: {
    color: 'white',
  },
  text_TERTIARY: {
    color: 'gray',
    fontSize: 12,
  },
  text_PRIMARY_OUTLINE: {
    color: '#549764',
  },

  text_LINK: {
    color: '#3B74BE',
    textDecorationLine: 'underline',
  },
});

export default CustomButton;
