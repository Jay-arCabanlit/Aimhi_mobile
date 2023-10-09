import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ContactScreen = ({Screen, defaultVal}) => {
  useEffect(() => {}, []);

  const back = () => {};

  let dropdown = [
    {label: 'Accessing the app', value: '1'},
    {label: 'Troubleshoot', value: '2'},
    {label: 'General Inquiry', value: '3'},
  ];

  const {
    control,
    handleSubmit,

    formState: {errors},
  } = useForm({
    defaultValues: {types: typeof Screen == 'undefined' ? '1' : defaultVal},
  });

  const submit = () => {
    console.log('hello');
  };
  return (
    <ScrollView>
      <View style={{flex: 1, padding: 10}}>
        {typeof Screen == 'undefined' && (
          <View style={{width: 60}}>
            <CustomButton text="Back" onPress={back} type="LINK" />
          </View>
        )}

        <View style={{padding: 20}}>
          <Text
            style={{
              fontSize: 16,
              color: '#25303C',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            We’re here to help
          </Text>
          <Text style={styles.placeholder}>How Can We Help?</Text>
          <CustomPicker
            name="types"
            placeholder=""
            data={dropdown}
            control={control}
            rules={{required: 'Username is required'}}
          />
          <Text style={styles.placeholder}>Your message</Text>
          <CustomInput
            name="message"
            multiline={true}
            control={control}
            rules={{required: 'Message is required'}}
          />

          <Text
            style={{
              fontSize: 16,
              color: '#25303C',
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 32,
            }}>
            Contact Information
          </Text>

          <Text style={styles.placeholder}>
            Please let us know what’s the best way to contact you about your
            inquiry by providing your details below.
          </Text>
          <Text style={styles.placeholder}>Your name</Text>
          <CustomInput
            name="name"
            placeholder="name"
            control={control}
            rules={{required: 'Name is required'}}
          />
          <Text style={styles.placeholder}>Your Email</Text>
          <CustomInput
            name="email"
            placeholder="email"
            control={control}
            rules={{required: 'email is required'}}
          />
          <Text style={styles.placeholder}>Best Contact Number</Text>
          <CustomInput
            name="contact_number"
            placeholder="Contact Number"
            control={control}
            rules={{required: 'Contact number is required'}}
          />
          <View style={{display: 'flex', flexDirection: 'row', marginTop: 24}}>
            <BouncyCheckbox
              size={16}
              fillColor="#25303C"
              unfillColor="#FFFFFF"
              iconStyle={{borderColor: '#25303C'}}
              innerIconStyle={{borderWidth: 2}}
            />
            <Text
              style={{color: '#23303D', fontSize: 14, fontWeight: 'normal'}}>
              By clicking submit, you agree to our{' '}
              <Text style={{color: '#3B74BE', textDecorationLine: 'underline'}}>
                Terms of Use
              </Text>{' '}
              and{' '}
              <Text style={{color: '#3B74BE', textDecorationLine: 'underline'}}>
                Privacy policy
              </Text>
              .
            </Text>
          </View>
          <View style={{marginTop: 40}}>
            <CustomButton
              text="Submit"
              onPress={submit}
              type="DARK"
              disable={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#25303C',
    marginTop: 24,
  },
});

export default ContactScreen;
