import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  multiline,
}) => {
  console.log(multiline);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#747070'},
              {
                height: typeof multiline == 'undefined' ? 37 : 150,
              },
            ]}>
            <TextInput
              multiline={typeof multiline == 'undefined' ? false : multiline}
              numberOfLines={typeof multiline != 'undefined' ? 10 : 1}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input, multiline == true ? styles.textArea : ' ']}
              secureTextEntry={secureTextEntry}
              placeholderTextColor="#23303DC3"
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
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
    fontWeight: 'normal',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {},
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
});

export default CustomInput;
