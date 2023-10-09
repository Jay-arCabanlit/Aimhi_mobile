import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import React from 'react';

const image = {
  helmet: require('../../../assets/icon/helmet.png'),
  time: require('../../../assets/icon/time.png'),
  continuous: require('../../../assets/icon/continuous.png'),
  shipped: require('../../../assets/icon/shipped.png'),
  request: require('../../../assets/icon/request.png'),
  fuel_pump: require('../../../assets/icon/fuel-pump.png'),
  home: require('../../../assets/icon/home.png'),
};

const CustomMenuButton = ({onPress, iconImage, text}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image[`${iconImage}`]} style={{width: 32, height: 32}} />
      <Text
        style={{
          fontSize: 12,
          color: '#25303C',
          marginTop: 8,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#25303C',
    borderWidth: 1,
    padding: 10,
    width: 86,
    height: 97,
    borderRadius: 10,
  },
});

export default CustomMenuButton;
