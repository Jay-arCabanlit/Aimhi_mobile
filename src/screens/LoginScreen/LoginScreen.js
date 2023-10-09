import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/images/Aimhi2.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Login, userData} from '../../hooks/apiRequest/LoginAPIS';
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserId,
  setCompanyId,
  setToken,
  setEmail,
  setFullName,
  setProfileLink,
} from '../../redux/action/action';
import InternetStatus from '../../components/InternetStatus/InternetStatus';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const {user_id, company_id, network_status, token} = useSelector(
    state => state.loginReducer,
  );
  const dispatch = useDispatch();
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onLoginPressed = async data => {
    if (loading) {
      return;
    }

    let res = await Login(data);

    if (res.data.response.login == 1) {
      console.log(res, 'login response');
      dispatch(setCompanyId(res.data.response.company_id));
      dispatch(setUserId(res.data.response.user_id));
      dispatch(setToken(res.data.response.token));
      let user_id = res.data.response.user_id;
      let token = res.data.response.token;
      getUserInfo(user_id, token);
      navigation.navigate('Home');

      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getUserInfo = async (user_id, token) => {
    try {
      const response = await userData(user_id, token);
      if (response.data.status == 1) {
        console.log();
        dispatch(setFullName(response.data.response.full_name));
        dispatch(setEmail(response.data.response.email));
        dispatch(setProfileLink(response.data.response.profile_pic));
      }
    } catch (error) {}
  };

  const onForgotPasswordPressed = async () => {
    console.warn('forgot');
  };

  const onContactUsPresses = async () => {
    navigation.navigate('ContactScreen');
  };

  console.log(network_status, 'net_work');

  return (
    <View style={styles.root}>
      {(network_status == false || network_status == null) && (
        <InternetStatus />
      )}

      <Image
        source={Logo}
        style={[styles.logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <View style={{width: '100%'}}>
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />
      </View>

      <View style={{width: '100%', top: 30}}>
        <CustomButton
          text={loading ? 'Loading ...' : 'Log In'}
          onPress={handleSubmit(onLoginPressed)}
          type="PRIMARY"
        />
        <CustomButton
          text="Forgot password ?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
      </View>

      <View style={{width: '100%', top: 30, alignItems: 'center'}}>
        <Text style={{fontSize: 12}}>OR</Text>
        <View style={{width: '100%', top: 30, alignItems: 'center'}}>
          <CustomButton
            text="Contact Us"
            onPress={onContactUsPresses}
            type="SECONDARY"
          />
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text style={{fontWeight: 'normal', color: '#23303D'}}>
          Powered by EVE. Copyright 2022
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default LoginScreen;
