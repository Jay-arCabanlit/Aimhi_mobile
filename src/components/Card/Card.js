import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';

const Card = ({header, body, toggle}) => {
  return (
    <View style={styles.cardsContainer}>
      <View style={styles.cardHeader}>{header}</View>
      {toggle && <View style={styles.cardBody}>{body()}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
  },
  cardHeader: {
    backgroundColor: '#E8EFE8',
    padding: 16,
  },
  cardBody: {
    borderWidth: 1,
    borderColor: '#DEDEE1',
    padding: 16,
  },
});

export default Card;
