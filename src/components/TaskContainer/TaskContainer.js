import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, memo, useMemo, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTaskList} from '../../hooks/apiRequest/ProjectAPIS';
import Slider from '@react-native-community/slider';
import {FlashList} from '@shopify/flash-list';

const TaskContainer = ({taskData, onchange}) => {
  console.log(taskData, 'hehe12');
  const ref = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(taskData);
  }, [taskData]);

  const getStyle = val => {
    if (val > 0 && val != 100) {
      return '#f2e442';
    } else if (val == 100) {
      return '#649569';
    } else {
      return '#23303D';
    }
  };

  return (
    <View style={{flex: 1, height: '70%'}}>
      <FlashList
        ref={ref}
        data={data}
        renderItem={({item, index}) => {
          let PhaseIndex = index;
          return (
            <View style={{padding: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#23303D',
                    marginLeft: 5,
                  }}>
                  {item.Phase}
                </Text>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: '#3B74BE',
                    fontSize: 12,
                  }}>
                  Collapse
                </Text>
              </View>
              <ScrollView
                vertical={true}
                nestedScrollEnabled={true}
                style={{height: '100%', width: '100%'}}>
                <FlatList
                  data={item.Task}
                  renderItem={({item, index}) => (
                    <View
                      style={[
                        styles.taskContainer,
                        item.Status > 0 && styles.bgStatusOngoing,
                        item.Status == 100 && styles.bgStatusDone,
                      ]}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#23303D',
                        }}>
                        {item.SOW}
                      </Text>
                      <Text
                        style={{
                          marginTop: 8,
                          fontSize: 14,
                          fontWeight: 'normal',
                          color: '#23303D',
                        }}>
                        Start Date: {item.StartDate}
                      </Text>

                      <Text
                        style={{
                          marginTop: 8,
                          fontSize: 14,
                          fontWeight: 'normal',
                          color: '#23303D',
                        }}>
                        End Date: {item.EndDate}
                      </Text>
                      <Text
                        style={{fontSize: 10, color: '#747070', marginTop: 16}}>
                        Progress
                      </Text>
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Slider
                          style={{width: '90%', height: 50}}
                          minimumValue={0}
                          maximumValue={100}
                          step={10}
                          value={item.Status}
                          minimumTrackTintColor={getStyle(item.Status)}
                          maximumTrackTintColor="#23303D"
                          thumbTintColor={getStyle(item.Status)}
                          onValueChange={value =>
                            onchange(
                              {id: item.id, status: value},
                              PhaseIndex,
                              index,
                            )
                          }
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#23303D',
                            fontWeight: 'normal',
                            top: 15,
                          }}>
                          {item.Status}%
                        </Text>
                      </View>
                    </View>
                  )}
                  extraData={item.Task}
                  estimatedItemSize={200}
                />
              </ScrollView>
            </View>
          );
        }}
        extraData={data}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#23303d21',
  },
  bgStatusOngoing: {
    backgroundColor: '#fdfe542b',
  },
  bgStatusDone: {
    backgroundColor: '#5497612e',
  },
});

export default TaskContainer;
