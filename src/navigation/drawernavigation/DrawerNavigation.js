import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ProjectScreen from '../../screens/ProjectScreen/ProjectScreen';
import ButtomTab from '../home/ButtomTab';
import DrawerContent from '../../screens/DrawerContent/DrawerContent';
import TermsOfUseScreen from '../../screens/TermsOfUseScreen/TermsOfUseScreen';
import ContactScreen from '../../screens/ContactScreen/ContactScreen';
const Drawer = createDrawerNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      options={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Home"
        component={ProjectScreen}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Terms"
        component={TermsOfUseScreen}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Contact"
        component={ContactScreen}
      />

      <Drawer.Screen
        name="ButtomTab"
        component={ButtomTab}
        options={{
          headerShown: false,
          drawerItemStyle: {display: 'none'},
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
