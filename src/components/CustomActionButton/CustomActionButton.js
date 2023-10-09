import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
const image = {
  message: require('../../../assets/icon/message.png'),
  reload: require('../../../assets/icon/reload.png'),
  question: require('../../../assets/icon/question.png'),
  lock: require('../../../assets/icon/lock.png'),
  newsPaperFolded: require('../../../assets/icon/newspaper-folded.png'),
};

const CustomActionButton = ({onPress, text, iconImage}) => {
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Image
        style={{
          width: 22,
          height: 22,
          marginLeft: 34,
          tintColor: '#25303C',
        }}
        source={image[`${iconImage}`]}
      />
      <Text style={styles.actionButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#747070',
    borderBottomColor: '#747070',
    padding: 10,
  },
  actionButtonText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#25303C',
  },
});

export default CustomActionButton;
