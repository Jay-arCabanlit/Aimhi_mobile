import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, memo, useCallback, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getTaskList,
  GetUpdates,
  ProjectListData,
  TaskList,
  UpdateStatus,
  updateStatus,
} from '../../hooks/apiRequest/ProjectAPIS';
import Slider from '@react-native-community/slider';
import TaskContainer from '../../components/TaskContainer/TaskContainer';
import {QueryClient} from 'react-query';
import {FlashList} from '@shopify/flash-list';
import ProjectBox from '../../components/ProjectBox/ProjectBox';
import CustomButton from '../../components/CustomButton/CustomButton';
import NoteScreen from '../NoteScreen/NoteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {setProjectId, setProjectName} from '../../redux/action/action';

const ProjectScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [active, setActive] = useState(1);
  const [activeTab, setActiveTab] = useState(1);
  // const [projectId, setProjectId] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [taskData, setTaskData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [screenName, setScreenName] = useState('My Open Project');

  const {user_id, company_id, project_id, project_name, network_status, token} =
    useSelector(state => state.loginReducer);

  useEffect(() => {
    if (network_status == false) {
      ProjectOfflineData();
      console.log('offline ni');
    } else {
      GetAllProject(company_id, user_id);
      getNotes();
    }
  }, []);

  const ProjectOfflineData = async () => {
    try {
      console.log('im here in ofline data');
      const projects = await AsyncStorage.getItem('@projects');
      console.log(JSON.parse(projects));
      setProjectList(JSON.parse(projects));
    } catch (error) {
      console.log(error);
    }
  };

  //Get all project list function
  const GetAllProject = async (company_id, user_id) => {
    try {
      const response = await ProjectListData(user_id, company_id);
      if (response.status == 200) {
        console.log(response.data.response, 'project screen');
        setProjectList(response.data.response);
      }
    } catch (error) {
      console.log(error, 'error under GetAllProject function');
    }
  };

  //if project press and get all task under the project
  const ProjectPress = async (project_id, project_name) => {
    try {
      // if (network_status == false) {
      //   setProjectId(project_id);
      //   let data = JSON.parse(await AsyncStorage.getItem('@task'));
      //   let task = data.find(a => a.project_id == project_id);

      //   setTaskData(task['task']);
      //   setScreenName(project_name);
      //   setActive(2);
      // } else {
      //   const response = await TaskList(project_id, company_id);
      //   if (response.status == 200) {
      //     setTaskData(response.data.response);
      //     setScreenName(project_name);
      //     setActive(2);
      //   } else {
      //   }
      // }
      dispatch(setProjectId(project_id));
      dispatch(setProjectName(project_name));

      navigation.navigate('ButtomTab');
    } catch (error) {
      console.log(error, 'error under ProjectPress function');
    }
  };

  //Slider Change status of a task
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

  const getNotes = async () => {
    try {
      console.log('hello');
      const response = await GetUpdates(
        company_id,
        project_id,
        1,
        10,
        user_id,
        token,
      );
      console.log(response);
      if (response.data.status == 1) {
        console.log(response);
      }
    } catch (error) {
      console.lo(error);
    }
  };

  //back button project screen
  const back = async () => {
    navigation.navigate('ProjectScreen');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        {active == 2 && (
          <View>
            <CustomButton text="Back" onPress={back} type="LINK" />
          </View>
        )}
        <View
          style={{
            borderBottomColor: '#DEDEE1',
            borderBottomWidth: 0.5,
            width: '100%',
          }}>
          <Text
            style={{
              fontSize: active == 1 ? 28 : 18,
              color: '#23303D',
              marginTop: 10,
            }}>
            {screenName}
          </Text>
        </View>
      </View>
      {active == 1 ? (
        <ScrollView style={styles.projectContainer}>
          <FlashList
            data={projectList}
            keyExtractor={item => item.ProjectId}
            renderItem={({item}) => (
              <ProjectBox
                ImageLink={
                  network_status == false
                    ? item.Image == ''
                      ? item.Image
                      : Platform.OS == 'android'
                      ? 'file://' + item.Image
                      : item.Image
                    : item.Image
                }
                ProjectName={item.ProjectName}
                ProjectLocation="location"
                SowStatus={[
                  {
                    phase: 'mobilazation',
                    done: 0,
                    ongoing: 0,
                    todo: 8,
                  },
                  {
                    phase: 'Reinforce Concrete Works',
                    done: 1,
                    ongoing: 2,
                    todo: 8,
                  },
                ]}
                // Phase="Mobilazation"
                // Done={item.sow_status.done}
                // Doing={item.sow_status.ongoing}
                Todo={item.sow_status.todo}
                onPress={() => ProjectPress(item.ProjectId, item.ProjectName)}
              />
            )}
            estimatedItemSize={20}
          />
        </ScrollView>
      ) : (
        <View style={{height: '100%'}}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab(1)}
              style={[styles.buttonTab, activeTab == 1 ? styles.active : '']}>
              <Text style={styles.textTab}>Scope of Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab(2)}
              style={[styles.buttonTab, activeTab == 2 ? styles.active : '']}>
              <Text style={styles.textTab}>Updates</Text>
            </TouchableOpacity>
          </View>
          {activeTab == 1 ? (
            <TaskContainer taskData={taskData} onchange={onStatusChange} />
          ) : (
            <NoteScreen />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 10,
  },
  projectContainer: {
    height: '100%',
    width: '100%',
    marginTop: 26,
    padding: 10,
  },
  imageContainer: {
    width: '95%',
    padding: 10,
    marginLeft: 10,
    borderBottomColor: '#DEDEE1',
    borderBottomWidth: 0.5,
  },
  textTopTab: {
    fontSize: 18,
    fontWeight: '700',
    color: '#23303D',
  },

  tabContainer: {
    marginTop: 30,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonTab: {
    width: '50%',

    padding: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: '#549764',
  },
  textTab: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
});

export default ProjectScreen;
