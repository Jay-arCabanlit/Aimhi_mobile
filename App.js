/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  LogBox,
} from 'react-native';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store/store';
import Navigation from './src/navigation/main/Navigation';
import InternetStatus from './src/components/InternetStatus/InternetStatus';
const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={Store}>
      <SafeAreaView style={{flex: 1}}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
