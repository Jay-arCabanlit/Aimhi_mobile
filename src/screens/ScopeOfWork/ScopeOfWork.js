import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import TaskContainer from '../../components/TaskContainer/TaskContainer';
import {useSelector, useDispatch} from 'react-redux';
import {
  getTaskList,
  GetUpdates,
  ProjectListData,
  TaskList,
  UpdateStatus,
  updateStatus,
} from '../../hooks/apiRequest/ProjectAPIS';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import BackScreenTitle from '../../components/BackScreenTitle/BackScreenTitle';
const ScopeOfWork = () => {
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState([]);
  const {user_id, company_id, project_id, project_name, network_status, token} =
    useSelector(state => state.loginReducer);

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    try {
      console.log('hello');
      if (network_status == false) {
        let data = JSON.parse(await AsyncStorage.getItem('@task'));
        let task = data.find(a => a.project_id == project_id);

        setTaskData(task['task']);

        setActive(2);
      } else {
        const response = await TaskList(project_id, company_id);
        if (response.status == 200) {
          console.log('hello po');
          console.log(response.data.response, 'response');
          setTaskData(response.data.response);
        } else {
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onStatusChange = async (data, PhaseIndex, Index) => {
    try {
      if (network_status == false) {
        let dataTask = JSON.parse(await AsyncStorage.getItem('@task'));
        let Getindex = dataTask.findIndex(a => a.project_id == projectId);

        dataTask[Getindex].task[PhaseIndex].Task[Index].Status = data.status;

        let newData = JSON.stringify(dataTask);
        await AsyncStorage.setItem('@task', JSON.stringify(dataTask), () => {
          AsyncStorage.mergeItem('@task', JSON.stringify(newData));
        });

        let newArr = [...taskData];
        newArr[PhaseIndex].Task[Index].Status = data.status;
        console.log(newArr);
        setTaskData(newArr);
      } else {
        const response = await UpdateStatus(data);
        if (response.data.status == 1) {
          let newArr = [...taskData];
          newArr[PhaseIndex].Task[Index].Status = data.status;
          console.log(newArr);
          setTaskData(newArr);
        } else {
        }
      }
    } catch (error) {
      console.log(error, 'error under onStatus function');
    }
  };

  const back = async () => {
    navigation.navigate('ProjectScreen');
  };

  return (
    <View style={styles.container}>
      <BackScreenTitle ProjectName={project_name} />
      <TaskContainer taskData={taskData} onchange={onStatusChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default ScopeOfWork;
