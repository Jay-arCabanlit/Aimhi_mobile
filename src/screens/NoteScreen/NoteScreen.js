import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useRef} from 'react';
import CustomNoteContainer from '../../components/CustomNoteContainer/CustomNoteContainer';
import {SafeAreaView} from 'react-native-safe-area-context';

const NoteScreen = () => {
  const [view, setView] = useState('post');

  return <CustomNoteContainer />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default NoteScreen;
