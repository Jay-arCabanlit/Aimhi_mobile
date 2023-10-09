import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Card from '../../components/Card/Card';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker from '../../components/CustomPicker/CustomPicker';

import {ScrollView} from 'react-native-gesture-handler';
const SiteVisitAdd = () => {
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
          <Text>Date</Text>
          <CustomInput
            name="Date"
            placeholder="Date"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text>Primar Purpose</Text>
          <CustomInput
            name="Date"
            placeholder="Primar Purpose"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text>Major Event</Text>
          <CustomInput
            name="Date"
            placeholder="Major Event"
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

export default SiteVisitAdd;
