import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import CustomNoteContainer from '../../components/CustomNoteContainer/CustomNoteContainer';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackScreenTitle from '../../components/BackScreenTitle/BackScreenTitle';
import {useSelector, useDispatch} from 'react-redux';

const Update = () => {
  const {user_id, company_id, project_id, project_name, network_status, token} =
    useSelector(state => state.loginReducer);

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <BackScreenTitle ProjectName={project_name} />
      <CustomNoteContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default Update;
