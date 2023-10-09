import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
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
import ClipLoader from 'react-spinners/ClipLoader';
import {
  DashBoardData,
  GetUpdates,
  ProjectListData,
  TaskList,
  getUpdates,
} from '../../hooks/apiRequest/ProjectAPIS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {set} from 'react-hook-form';

const SyncData = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [project, setProject] = useState('Waiting');
  const [update, setUpdate] = useState('Waiting');
  const [sow, setSow] = useState('Waiting');
  const [report, setReport] = useState('Waiting');
  const [syncDone, setSyncDone] = useState(false);
  const [projectId, setProjectId] = useState([]);
  const {user_id, company_id, project_id, project_name, token} = useSelector(
    state => state.loginReducer,
  );
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Download App StoragePermission',
          message:
            'Cool Photo App needs access to your storage' +
            'so you can download file.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadImage = async imagePath => {
    console.log(imagePath, 'image path');
    const response = await RNFetchBlob.config({
      fileCache: true,
      // by adding this option, the temp files will have a file extension
      appendExt: 'png',
    }).fetch('GET', imagePath, {
      //some headers ..
    });

    return response.path();
  };

  const DownLoad = async () => {
    try {
      await AsyncStorage.clear(); //  clear first the storage before syncing
      setProject('Syncing');
      const response = await ProjectListData(user_id, company_id);
      let arrDAta = [];
      let projId = [];

      if (response.status == 200) {
        console.log('success');
        let resData = [...response.data.response];
        console.log(resData.length);

        for (let index = 0; index < resData.length; index++) {
          console.log(index);
          if (resData[index].Image != '') {
            resData[index].Image = await downloadImage(resData[index].Image[0]);
          }

          arrDAta.push(resData[index]);
          projId.push(resData[index].ProjectId);
        }

        console.log(arrDAta, 'arr data');
        console.log(JSON.stringify(arrDAta), 'arr data');
        await AsyncStorage.setItem('@projects', JSON.stringify(arrDAta));

        setProject('Done');
        updateData(projId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async projId => {
    try {
      let updatesArr = [];
      setUpdate('Syncing');
      for (let Id_index = 0; Id_index < projId.length; Id_index++) {
        const response = await GetUpdates(
          company_id,
          projId[Id_index],
          1,
          10,
          user_id,
          token,
        );
        if (response.data.status == 1) {
          console.log(response, 'response');
          let res = response.data.response.data;
          if (res.length > 0) {
            for (
              let Update_index = 0;
              Update_index < res.length;
              Update_index++
            ) {
              for (
                let index = 0;
                index < res[Update_index].img.length;
                index++
              ) {
                res[Update_index].img[index] = await downloadImage(
                  res[Update_index].img[index].link,
                );
              }

              updatesArr.push({
                project_id: projId[Id_index],
                updates: res[Update_index],
              });
            }
          }
        }
      }

      let data = JSON.stringify(updatesArr);
      console.log(data, 'data');
      await AsyncStorage.setItem('@updates', data);

      setUpdate('Done');
      sowData(projId);
    } catch (error) {
      console.log(error);
    }
  };

  const sowData = async projId => {
    try {
      setSow('Syncing');
      let arrTask = [];
      for (let index = 0; index < projId.length; index++) {
        const response = await TaskList(projId[index], company_id);
        console.log(response, 'response');
        if (response.data.status == 1) {
          arrTask.push({
            project_id: projId[index],
            task: response.data.response,
          });
        }
      }

      let data = JSON.stringify(arrTask);
      console.log(arrTask);
      await AsyncStorage.setItem('@task', data);
      setSow('Done');
      retportData();
    } catch (error) {
      console.log(error);
    }
  };

  const retportData = async () => {
    try {
      setReport('Syncing');
      const response = await DashBoardData(company_id);
      if (response.data.status == 1) {
        let data = response.data.response;
        await AsyncStorage.setItem('@dashboard', JSON.stringify(data));
      }
      setReport('Done');
      setSyncDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  const GoOffline = () => {};

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginTop: 10}}>
              <Text style={styles.modalTextHeader}>
                Get Data From Server{' '}
                <Image
                  source={require('../../../assets/icon/information.png')}
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: '#23303d',
                  }}
                />
              </Text>
              <Text style={styles.modalText}>
                Don't worry after this you can use aimhi offline or without
                internet connection.
              </Text>
              <Text style={styles.modalText}>
                Please stay connected to the internet or turn your data On to
                avoid interruption.
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <View style={styles.syncDataContainer}>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text style={styles.moduleText}>Project</Text>
                </View>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text
                    style={[
                      styles.progressText,
                      styles[`progressText${project}`],
                    ]}>
                    {project}
                    {'  '}
                    <Text style={{marginLeft: 5}}>
                      {project == 'Waiting' && (
                        <Image
                          source={require('../../../assets/icon/reload.png')}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: '#7c7c7c',
                          }}
                        />
                      )}
                      {project == 'Syncing' && (
                        <ActivityIndicator color="red" />
                      )}
                      {project == 'Done' && (
                        <Image
                          source={require('../../../assets/icon/download.png')}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: '#3a7d21',
                            marginLeft: 10,
                          }}
                        />
                      )}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.syncDataContainer}>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text style={styles.moduleText}>Update</Text>
                </View>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text
                    style={[
                      styles.progressText,
                      styles[`progressText${update}`],
                    ]}>
                    {update} {'  '}
                    {update == 'Waiting' && (
                      <Image
                        source={require('../../../assets/icon/reload.png')}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: '#7c7c7c',
                        }}
                      />
                    )}
                    {update == 'Syncing' && <ActivityIndicator color="red" />}
                    {update == 'Done' && (
                      <Image
                        source={require('../../../assets/icon/download.png')}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: '#3a7d21',
                          marginLeft: 10,
                        }}
                      />
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.syncDataContainer}>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text style={styles.moduleText}>Scope of Work</Text>
                </View>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text
                    style={[styles.progressText, styles[`progressText${sow}`]]}>
                    {sow} {'  '}
                    {sow == 'Waiting' && (
                      <Image
                        source={require('../../../assets/icon/reload.png')}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: '#7c7c7c',
                        }}
                      />
                    )}
                    {sow == 'Syncing' && <ActivityIndicator color="red" />}
                    {sow == 'Done' && (
                      <Image
                        source={require('../../../assets/icon/download.png')}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: '#3a7d21',
                          marginLeft: 10,
                        }}
                      />
                    )}
                  </Text>
                </View>
              </View>
              <View style={styles.syncDataContainer}>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text style={styles.moduleText}>Report</Text>
                </View>
                <View style={{width: '50%', textAlign: 'left'}}>
                  <Text
                    style={[
                      styles.progressText,
                      styles[`progressText${report}`],
                    ]}>
                    {report} {'  '}
                    {report == 'Waiting' && (
                      <Image
                        source={require('../../../assets/icon/reload.png')}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: '#7c7c7c',
                        }}
                      />
                    )}
                    {report == 'Syncing' && <ActivityIndicator color="red" />}
                    {report == 'Done' && (
                      <Image
                        source={require('../../../assets/icon/download.png')}
                        style={{
                          width: 15,
                          height: 15,
                          tintColor: '#3a7d21',
                          marginLeft: 10,
                        }}
                      />
                    )}
                  </Text>
                </View>
              </View>
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
                  text="Close"
                  onPress={() => setModalVisible(false)}
                  type="DANGER"
                />
              </View>
              <View style={{width: '50%'}}>
                {syncDone == false && (
                  <CustomButton
                    text="Download Now"
                    onPress={DownLoad}
                    type="PRIMARY"
                  />
                )}
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
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
  modalText: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'left',
  },
  modalTextHeader: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#23303d',
  },

  syncDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },

  moduleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  progressText: {
    fontSize: 15,

    textAlign: 'right',
  },
  progressTextSyncing: {
    color: 'red',
  },
  progressTextDone: {
    color: 'green',
  },
});

export default SyncData;
