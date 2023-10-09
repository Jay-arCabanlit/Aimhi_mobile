import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import {Icon} from '@iconify/react';
import ProfileScreen from '../../screens/ProfileScreen/ProfileScreen';
import ProjectScreen from '../../screens/ProjectScreen/ProjectScreen';
import ScopeOfWork from '../../screens/ScopeOfWork/ScopeOfWork';
import Update from '../../screens/Update/Update';
import Equipment from '../../screens/Equipment/Equipment';
import SiteVisit from '../../screens/SiteVisit/SiteVisit';

const Screen3 = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen3</Text>
    </View>
  );
};

const Post = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Screen4</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

console.log(Tab);

const CustomButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#549764',
        borderColor: 'white',
        borderWidth: 3,
        ...styles.buttonShadow,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const ButtomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        title: '',
        tabBarStyle: {
          possition: 'absolute',
          elevation: 0,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          ...styles.shadow,
        },
      }}>
      {/* <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <Image
                source={require('../../../assets/icon/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#549764' : '#23303d',
                }}
              />
              <Text
                style={{color: focused ? '#549764' : '#23303d', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="ScopeOfWork"
        component={ScopeOfWork}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 15}}>
              <Image
                source={require('../../../assets/icon/sow.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#549764' : '#23303d',
                }}
              />
              <Text
                style={{color: focused ? '#549764' : '#23303d', fontSize: 12}}>
                Scope of Work
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Update}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <Image
                source={require('../../../assets/icon/notes.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#549764' : '#23303d',
                }}
              />
              <Text
                style={{color: focused ? '#549764' : '#23303d', fontSize: 12}}>
                Notes
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Equipment"
        component={Equipment}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <Image
                source={require('../../../assets/icon/construction-machine.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#549764' : '#23303d',
                }}
              />
              <Text
                style={{color: focused ? '#549764' : '#23303d', fontSize: 12}}>
                Equipment
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../../assets/icon/plus.png')}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: '#fff'}}
            />
          ),
          tabBarButton: props => <CustomButton {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="SiteVisit"
        component={SiteVisit}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <Image
                source={require('../../../assets/icon/sitevisit.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#549764' : '#23303d',
                }}
              />
              <Text
                style={{color: focused ? '#549764' : '#23303d', fontSize: 12}}>
                Site Visit
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 12}}>
              <Image
                source={require('../../../assets/icon/construction-worker.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#549764' : '#23303d',
                }}
              />
              <Text
                style={{color: focused ? '#549764' : '#23303d', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20,
    elevation: 24,
  },

  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default ButtomTab;
