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
import {getDetails, getReport} from '../../hooks/apiRequest/ProjectAPIS';
import {useSelector, useDispatch} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';

const SiteVisitList = () => {
  const [status, setStatus] = useState(0);
  const [report, setReport] = useState([]);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(-1);
  const [id, setId] = useState(0);

  useEffect(() => {
    getReportList();
  }, [toggle]);

  useEffect(() => {}, [id]);

  const {user_id, company_id, project_id, project_name, network_status, token} =
    useSelector(state => state.loginReducer);

  const getReportList = async () => {
    try {
      const res = await getReport(
        company_id,
        project_id,
        'site_visit',
        0,
        token,
      );
      if (res.data.status == 1) {
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
      const res = await getDetails('site_visit', id, token);
      console.log(res.data.response);
      console.log(res.data.status);
      if (res.data.status == 1) {
        setData(res.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{flex: 1, marginBottom: 20}}>
      <FlashList
        data={report}
        keyExtractor={item => item.report_log_id}
        renderItem={({item, index}) => (
          <Pressable
            style={styles.cardsContainer}
            onPress={() => toggleMe(index, item.report_log_id)}>
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

                <Text style={{fontSize: 19, marginLeft: 10}}>{item.date}</Text>
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
                  keyExtractor={item => item.report_id}
                  renderItem={({item, index}) => (
                    <View>
                      <View style={{flexDirection: 'row'}}>
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
                          <Text>Primary Pupose</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput value={item.purpose} />
                          </View>
                        </View>
                        <View style={{width: '45%'}}>
                          <Text>Major Events</Text>
                          <View style={styles.inputcontainer}>
                            <TextInput value={item.event} />
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

export default SiteVisitList;

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
