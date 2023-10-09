import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Controller} from 'react-hook-form';
const CustomPicker = ({
  control,
  name,
  rules = {},
  data,
  placeholder,
  secureTextEntry,
}) => {
  const [selectedValue, setSelectedValue] = useState('java');
  console.log(data);
  const PickerItem = () => {
    <FlatList
      data={data}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Picker.Item label={item.label} value={item.value} />
      )}
    />;
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View style={[styles.container]}>
            <Picker
              style={{width: '100%'}}
              itemStyle={{backgroundColor: 'grey', color: 'blue', fontSize: 17}}
              selectedValue={value}
              onValueChange={onChange}>
              {data.map(item => (
                <Picker.Item
                  label={item.label}
                  value={item.value}
                  key={item.value}
                />
              ))}
            </Picker>
          </View>
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#747070',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    fontWeight: 'normal',
    padding: 0,
  },
});

export default CustomPicker;
