import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Card from '../../components/Card/Card';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import EquipmentList from './EquipmentList';
import EquipmentAdd from './EquipmentAdd';
const Equipment = () => {
  const [screenName, setScreenName] = useState('list');

  const add = data => {
    setScreenName('Add');
  };

  return (
    <View style={{flex: 1, padding: 32}}>
      {screenName == 'list' ? (
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 100, height: 50}}>
            <CustomButton text="Filter" onPress={add} type="PRIMARY" />
          </View>

          <View style={{marginLeft: 'auto'}}>
            <CustomButton text="Add New" onPress={add} type="LINK" />
          </View>
        </View>
      ) : (
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Add New Record</Text>
      )}

      {screenName == 'list' ? (
        <EquipmentList addScreen={add} />
      ) : (
        <EquipmentAdd />
      )}
    </View>
  );
};

export default Equipment;
