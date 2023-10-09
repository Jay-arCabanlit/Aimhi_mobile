import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomBox = ({value, label}) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 85,
    width: 85,
    backgroundColor: '#fff',
    borderColor: '#312170',
    borderWidth: 1,
    borderRadius: 10,
    padding: 7,
    textAlign: 'center',
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  valueText: {
    color: '#312170',
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
  },
  labelText: {
    color: '#312170',
    fontWeight: 'normal',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CustomBox;
