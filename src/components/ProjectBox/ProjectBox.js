import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {memo} from 'react';
import {FlashList} from '@shopify/flash-list';

const ProjectBox = ({
  ProjectName,
  ProjectLocation,
  SowStatus,
  ImageLink,
  onPress,
}) => {
  console.log(ImageLink);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.projectNameText}>{ProjectName}</Text>
        <Text style={styles.projectLocationText}>
          Location: {ProjectLocation}
        </Text>
        <Text style={{fontSize: 12, color: '#549761', marginTop: 10}}>
          ACTIVE SCOPE OF WORK
        </Text>
        <FlatList
          data={SowStatus}
          renderItem={({item}) => (
            <View
              style={{display: 'flex', flexDirection: 'row', marginTop: 16}}>
              <View style={{width: '40%'}}>
                <Text style={{color: '#23303D', fontSize: 16}}>
                  {item.phase}
                </Text>
              </View>
              <View style={{width: '60%'}}>
                <Text style={{fontSize: 12, fontWeight: 'normal'}}>
                  TASK TODAY
                </Text>
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                  }}>
                  <View style={[styles.taskItem, styles.done]}>
                    <Text style={styles.textTask}>{item.done} Done</Text>
                  </View>
                  <View style={[styles.taskItem, styles.doing]}>
                    <Text style={styles.textTask}>{item.doing} Doing</Text>
                  </View>
                  <View style={[styles.taskItem, styles.toDo]}>
                    <Text style={styles.textTask}>{item.todo} To Do</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    borderBottomColor: '#DEDEE1',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  projectImage: {
    width: 85,
    height: 85,
  },
  projectNameText: {
    fontSize: 18,
    color: '#23303D',
    fontWeight: '500',
    marginTop: 10,
  },
  projectLocationText: {
    fontSize: 16,
    color: '#23303D',
    marginTop: 10,
  },
  taskItem: {
    width: 0,
    flex: 1,
    height: 24,
    padding: 1,
  },
  done: {
    backgroundColor: '#3A7D21',
  },
  doing: {
    backgroundColor: '#3B74BE',
  },
  toDo: {
    backgroundColor: '#747070',
  },
  textTask: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default memo(ProjectBox);
