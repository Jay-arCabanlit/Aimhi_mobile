import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Card from '../../components/Card/Card';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import EquipmentList from './EquipmentList';
import {ScrollView} from 'react-native-gesture-handler';
const EquipmentAdd = () => {

  

  let dropdown = [
    {label: 'Accessing the app', value: '1'},
    {label: 'Troubleshoot', value: '2'},
    {label: 'General Inquiry', value: '3'},
  ];

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const cancel = () => {};
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 10,
          marginTop: 10,
        }}>
        <View style={{width: '100%'}}>
          <Text>Hours Operated</Text>
          <CustomInput
            name="Date"
            placeholder="Date"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text>Equipment Category</Text>
          <CustomPicker
            name="types"
            placeholder=""
            data={dropdown}
            control={control}
            rules={{required: 'Username is required'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text>Equipment Model</Text>
          <CustomPicker
            name="types"
            placeholder=""
            data={dropdown}
            control={control}
            rules={{required: 'Username is required'}}
          />
        </View>
        <View style={{width: '45%'}}>
          <Text>Liter Refilled</Text>
          <CustomInput
            name="hours"
            placeholder="Liters"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '45%'}}>
          <Text>Hours Operated</Text>
          <CustomInput
            name="hours"
            placeholder="Hours"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '45%'}}>
          <Text>Start Mileage</Text>
          <CustomInput
            name="start"
            placeholder="Miliage"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '45%'}}>
          <Text>End Mileage</Text>
          <CustomInput
            name="hours"
            placeholder="Hours"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text>Operator</Text>
          <CustomInput
            name="hours"
            placeholder="Operator"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text>Discription</Text>
          <CustomInput
            name="hours"
            placeholder="Hours"
            multiline={true}
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          rowGap: 10,
        }}>
        <View style={{width: '45%'}}>
          <CustomButton text="Cancel" onPress={cancel} type="PRIMARY_OUTLINE" />
        </View>
        <View style={{width: '45%'}}>
          <CustomButton text="Save" onPress={cancel} type="PRIMARY" />
        </View>
      </View>
    </ScrollView>
  );
};

export default EquipmentAdd;
