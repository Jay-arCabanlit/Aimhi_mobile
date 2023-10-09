import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';
import {
  test,
  ProjectList,
  getProject,
  DashBoardData,
} from '../../hooks/apiRequest/ProjectAPIS';
import ButtomTab from '../../navigation/home/ButtomTab';
import CustomBox from '../../components/CustomBox/CustomBox';
import ProjectBox from '../../components/ProjectBox/ProjectBox';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import CustomMenuButton from '../../components/CustomMenuButton/CustomMenuButton';
import {
  setUserId,
  setCompanyId,
  setProjectId,
  setProjectName,
} from '../../redux/action/action';
import SyncData from '../../components/SyncData/SyncData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user_id, company_id, network_status, full_name} = useSelector(
    state => state.loginReducer,
  );
  const [projectList, setProjectList] = useState([]);
  const [delayed, setDelayed] = useState('');
  const [onTime, setOnTime] = useState('');
  const [projectCount, setProjectCount] = useState('');

  useEffect(() => {
    if (network_status == false) {
      GetDataOffline();
    } else {
      getDashboardData(company_id);
    }
  }, []);

  const GetDataOffline = async () => {
    try {
      let data = JSON.parse(await AsyncStorage.getItem('@dashboard'));

      setDelayed(data.delayed);
      setOnTime(data.ontime);
      setProjectCount(data.project_count);
    } catch (error) {}
  };

  const getDashboardData = async company_id => {
    try {
      const response = await DashBoardData(company_id);
      if (response.data.status == 1) {
        setDelayed(response.data.response.delayed);
        setOnTime(response.data.response.ontime);
        setProjectCount(response.data.response.project_count);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const onSuccess = async data => {
  //   setProjectList(data[0].data.response);
  //   setDelayed(data[1].data.response.delayed);
  //   setOnTime(data[1].data.response.ontime);
  //   setProjectCount(data[1].data.response.project_count);
  // };
  // console.log(projectList);
  // const onError = data => {};

  // console.log(company_id, user_id);

  // const {isLoading, data, isError, error, isFetching} = getProject(
  //   onSuccess,
  //   onError,
  //   user_id,
  //   company_id,
  // );

  // const getAllProject = async (company_id, user_id) => {
  //   try {
  //     const response = await ProjectList(company_id, user_id);
  //     console.log(response, 'response');
  //   } catch (error) {}
  // };

  const ProjectPress = async (project_id, project_name) => {
    console.log(project_id);
    dispatch(setProjectId(project_id));
    dispatch(setProjectName(project_name));
    navigation.navigate('ProjectScreen');
  };

  const updatePress = async () => {};

  // if (isLoading) {
  //   return <Text> Loading.....</Text>;
  // }

  // console.log({isLoading, isFetching});

  // if (isError) {
  //   return <Text>{error.message}</Text>;
  // }

  return (
    <View>
      <Text style={{fontSize: 28, fontWeight: 'bold', color: '#23303D'}}>
        Good Day {full_name}
      </Text>
      <View style={styles.summaryContainer}>
        <Text style={{color: '#23303D', fontSize: 21}}>Summary</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <CustomBox value={projectCount} label="All Projects" />
          <CustomBox value={onTime} label="On-Time" />
          <CustomBox value={delayed} label="Delayed" />
        </View>
      </View>
      <View style={{left: 40, top: 24}}>
        <Text style={{color: '#23303D', fontSize: 28}}>
          What would like to do today?
        </Text>
      </View>

      <View style={styles.projectContainer}>
        <View style={styles.menuContainer}>
          <CustomMenuButton
            onPress={updatePress}
            iconImage="home"
            text="Update Project"
          />
          <CustomMenuButton
            onPress={updatePress}
            iconImage="home"
            text="Check Daily Report"
          />
          <CustomMenuButton
            onPress={updatePress}
            iconImage="home"
            text="Confirm Delivery"
          />
          <CustomMenuButton
            onPress={updatePress}
            iconImage="home"
            text="Update Equipment"
          />
        </View>

        {/* <FlashList
          data={data[0].data.response}
          keyExtractor={item => item.ProjectId}
          renderItem={({item}) => (
            <ProjectBox
              ImageLink={item.Image}
              ProjectName={item.ProjectName}
              Phase="Mobilazation"
              Done={item.sow_status.done}
              Doing={item.sow_status.ongoing}
              Todo={item.sow_status.todo}
              onPress={() => ProjectPress(item.ProjectId, item.ProjectName)}
            />
          )}
          estimatedItemSize={20}
        /> */}
      </View>
      {network_status == true && <SyncData />}
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    width: '100%',
    height: 176,
    backgroundColor: '#ddeae0',
    paddingTop: 10,
    paddingLeft: 35,
    paddingRight: 35,
  },
  projectContainer: {
    padding: 36,
    top: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuContainer: {
    width: '80%',
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'space-between',
    rowGap: 30,
    columnGap: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
