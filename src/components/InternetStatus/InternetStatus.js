import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Lottie from 'lottie-react-native';
import CustomActionButton from '../CustomActionButton/CustomActionButton';
import CustomButton from '../CustomButton/CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserId,
  setCompanyId,
  setNetworkStatus,
} from '../../redux/action/action';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InternetStatus = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setModalVisible(state.isConnected == false ? true : false);
      dispatch(setNetworkStatus(state.isConnected));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const CheckInternet = () => {
    console.log('hello');
    NetInfo.fetch().then(state => {
      console.log('Connection type1', state.type);
      console.log('Is connected2?', state.isConnected);
      setModalVisible(state.isConnected == false ? true : false);
      dispatch(setNetworkStatus(state.isConnected));
    });
  };

  const GoOffline = async () => {
    try {
      let value = await AsyncStorage.getItem('@projects');
      console.log(value, 'hello');
      if (value != null) {
        navigation.navigate('ButtomTab');
      } else {
        Alert.alert('Oops!', 'There is no offline data save to your phone', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{height: 200, width: 250}}>
              <Lottie
                source={require('../../../assets/lottie/underconstruction-2.json')}
                autoPlay
                loop
              />
            </View>

            <View style={{marginTop: 10}}>
              <Text style={styles.modalTextHeader}>Oppps!</Text>
              <Text style={styles.modalText}>
                SLow or no internet connection.
              </Text>
            </View>
            <View
              style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                margin: 10,
              }}>
              <View style={{width: '50%'}}>
                <CustomButton
                  text="Reload"
                  onPress={CheckInternet}
                  type="DARK"
                />
              </View>
              <View style={{width: '50%'}}>
                <CustomButton
                  text="Go Offline"
                  onPress={GoOffline}
                  type="DARK"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#23303dc9',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextHeader: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default InternetStatus;
