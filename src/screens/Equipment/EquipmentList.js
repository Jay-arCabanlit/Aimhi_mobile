import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from '../../components/Card/Card';
import CustomInput from '../../components/CustomInput/CustomInput';
import {useForm, Controller} from 'react-hook-form';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomPicker from '../../components/CustomPicker/CustomPicker';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getByGroupId,
  getEquipmentUsage,
} from '../../hooks/apiRequest/ProjectAPIS';
import {useSelector, useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

const EquipmentList = ({addScreen}) => {
  const [status, setStatus] = useState(0);
  const [report, setReport] = useState([]);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(-1);
  const [id, setId] = useState(0);
  const {user_id, company_id, project_id, project_name, network_status, token} =
    useSelector(state => state.loginReducer);
  let dropdown = [
    {label: 'Accessing the app', value: '1'},
    {label: 'Troubleshoot', value: '2'},
    {label: 'General Inquiry', value: '3'},
  ];

  useEffect(() => {
    getAllEequipment();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      liters: '1',
    },
  });

  const add = async () => {
    try {
      addScreen('addScreen');
    } catch (error) {}
  };

  const getAllEequipment = async status => {
    try {
      const res = await getEquipmentUsage(
        company_id,
        project_id,
        status,
        token,
      );
      if (res.data.status) {
        setReport(res.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMe = async (index, id) => {
    try {
      setId(id);
      setToggle(index);
      const res = await getByGroupId(id, token);
      console.log(res);
      if (res.data.status == 1) {
        let arr = [...report];
        arr[index]['data'] = res.data.response;
        console.log(arr, 'arr here');
        setData(res.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const litersChange = (value, index) => {
    console.log(value, index);
    let arr = [...data];
    arr[index].letirs = value;
    setData(arr);
  };

  return (
    <ScrollView style={{flex: 1, marginBottom: 20}}>
      <FlashList
        data={report}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Pressable
            style={styles.cardsContainer}
            onPress={() => toggleMe(index, item.id)}>
            <View style={styles.cardHeader}>
              <View style={{flexDirection: 'row'}}>
                {toggle == index ? (
                  <Image
                    style={{width: 19, height: 19, marginTop: 5}}
                    source={require('../../../assets/icon/minus-square-outlined-button.png')}
                  />
                ) : (
                  <Image
                    style={{width: 19, height: 19, marginTop: 5}}
                    source={require('../../../assets/icon/squire_plus.png')}
                  />
                )}

                <Text style={{fontSize: 19, marginLeft: 10}}>
                  {item.date_created}
                </Text>
                <View
                  style={{
                    backgroundColor: '#25303C',
                    width: 16,
                    height: 16,
                    borderRadius: 16,
                    marginLeft: 'auto',
                  }}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 10}}>
                    3
                  </Text>
                </View>
              </View>
            </View>
            {toggle == index && (
              <ScrollView style={styles.cardBody}>
                <FlashList
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={({item, index}) => (
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: '#25303C',
                            fontSize: 14,
                            fontWeight: 'bold',
                          }}>
                          {item.equipment_category_name}
                        </Text>

                        <Image
                          style={{
                            width: 14,
                            height: 14,
                            marginTop: 5,
                            marginLeft: 'auto',
                          }}
                          source={require('../../../assets/icon/archive.png')}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          rowGap: 10,
                          marginTop: 10,
                        }}>
                        <View style={{width: '45%'}}>
                          <Text>Liters Refilled</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput
                              numeric
                              keyboardType="numeric"
                              value={item.liters.toFixed()}
                              maxLength={10}
                              onChangeText={value => {
                                let textval = [...data];
                                textval[index] = value;
                                setData(textval);
                              }}
                            />
                          </View>
                        </View>
                        <View style={{width: '45%'}}>
                          <Text>Hours Operated</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput
                              keyboardType="numeric"
                              value={item.hours_operated.toString()}
                            />
                          </View>
                        </View>
                        <View style={{width: '45%'}}>
                          <Text>Start Mileage</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput
                              value={
                                item.mileage_start == null ||
                                item.mileage_start == ''
                                  ? ''
                                  : item.mileage_start.toString()
                              }
                            />
                          </View>
                        </View>
                        <View style={{width: '45%'}}>
                          <Text>End Mileage</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput
                              keyboardType="numeric"
                              value={
                                item.mileage_end == null || item.mileage_end
                                  ? ''
                                  : item.mileage_ends.toString()
                              }
                            />
                          </View>
                        </View>
                        <View style={{width: '100%'}}>
                          <Text>Operator</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput value={item.operator} />
                          </View>
                        </View>
                        <View style={{width: '100%'}}>
                          <Text>Description</Text>
                          <View style={styles.inputContainerTextArea}>
                            <TextInput
                              multiline={true}
                              numberOfLines={10}
                              value={item.description}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  estimatedItemSize={100}
                />
              </ScrollView>
            )}
          </Pressable>
        )}
        estimatedItemSize={100}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    marginTop: 10,
  },
  cardHeader: {
    backgroundColor: '#E8EFE8',
    padding: 16,
  },
  cardBody: {
    borderWidth: 1,
    borderColor: '#DEDEE1',
    padding: 16,
  },
  inputcontainer: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#747070',
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: 'normal',
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 37,
  },
  inputContainerTextArea: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#747070',
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: 'normal',
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 150,
    textAlignVertical: 'top',
  },
});

export default EquipmentList;
