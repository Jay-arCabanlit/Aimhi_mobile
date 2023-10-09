import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  useRoute,
  useNavigationContainerRef,
} from '@react-navigation/native-stack';

import Logo from '../../../assets/images/logo.png';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useRef} from 'react';
import ButtomTab from '../../navigation/home/ButtomTab';
import CustomButton from '../../components/CustomButton/CustomButton';

import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import ContactScreen from '../../screens/ContactScreen/ContactScreen';
import ProjectScreen from '../../screens/ProjectScreen/ProjectScreen';
import DrawerNavigation from '../drawernavigation/DrawerNavigation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    text: '#23303d',
  },
};

const StackNavigation = () => {
  const SignOut = () => {};
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={DrawerNavigation}
        options={{
          title: '',
          headerLeft: () => (
            <Image source={Logo} style={{width: 80, height: 25}} />
          ),
          headerRight: () => (
            <View>
              <CustomButton text="Sign Out" onPress={SignOut} type="TERTIARY" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ButtomTab"
        component={ButtomTab}
        options={{
          title: '',
          headerLeft: () => (
            <Image source={Logo} style={{width: 80, height: 25}} />
          ),
          headerRight: () => (
            <View>
              <CustomButton text="Sign Out" onPress={SignOut} type="TERTIARY" />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Image source={Logo} style={{width: 80, height: 25}} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={navTheme}>
      <StackNavigation />
      {/* <DrawerNavigation /> */}
    </NavigationContainer>
  );
};

export default Navigation;
