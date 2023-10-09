import {View, Text} from 'react-native';
import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

const BackScreenTitle = ({ProjectName}) => {
  const navigation = useNavigation();
  const back = async () => {
    navigation.navigate('ProjectScreen');
  };
  return (
    <View
      style={{
        borderBottomColor: '#DEDEE1',
        borderBottomWidth: 0.5,
        width: '100%',
        // display: 'flex',
        // flexDirection: 'row',
      }}>
      {/* <View>
        <CustomButton text="Back" onPress={back} type="LINK" />
      </View> */}
      <View>
        <Text
          style={{
            fontSize: 18,
            color: '#23303D',
            marginTop: 10,
          }}>
          {ProjectName}
        </Text>
      </View>
    </View>
  );
};

export default BackScreenTitle;
