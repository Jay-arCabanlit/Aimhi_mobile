import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton';
const DrawerContent = props => {
  const {user_id, company_id, network_status, full_name, email, profile_link} =
    useSelector(state => state.loginReducer);
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              {profile_link == '' ? (
                <Image
                  style={{width: 48, height: 48, borderRadius: 24}}
                  source={require('../../../assets/icon/construction-worker.png')}
                />
              ) : (
                <Image
                  style={{width: 48, height: 48, borderRadius: 24}}
                  source={{
                    uri: profile_link,
                  }}
                />
              )}
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  {full_name}
                </Text>
                <Text style={{fontSize: 16, fontWeight: 'normal'}}>
                  {email}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <DrawerItem
            label="Home"
            icon={({color, size}) => (
              <Image
                source={require('../../../assets/icon/home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#23303d',
                }}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            label="Sync Data"
            icon={({color, size}) => (
              <Image
                source={require('../../../assets/icon/reload.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#23303d',
                }}
              />
            )}
          />
          <DrawerItem
            label="Help"
            icon={({color, size}) => (
              <Image
                source={require('../../../assets/icon/question.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#23303d',
                }}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Contact');
            }}
          />
          <DrawerItem
            label="Contact Support"
            icon={({color, size}) => (
              <Image
                source={require('../../../assets/icon/message.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#23303d',
                }}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Contact');
            }}
          />
          <DrawerItem
            label="Term of User"
            icon={({color, size}) => (
              <Image
                source={require('../../../assets/icon/newspaper-folded.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#23303d',
                }}
              />
            )}
            onPress={() => {
              props.navigation.navigate('Terms');
            }}
          />
        </View>
        <View style={styles.emailContainer}>
          <Text style={{color: '#25303C', fontSize: 16, fontWeight: '500'}}>
            Let's Talk
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#25303C',
              textAlign: 'justify',
              marginTop: 18,
            }}>
            We love hearing from you and we hope you’d share your experience in
            using the app.
          </Text>
          <View style={{width: '100%', marginTop: 20}}>
            <CustomButton
              text="Email Us"
              // onPress={() => setScreen('EmailUs')}
              type="PRIMARY_OUTLINE"
            />
          </View>
          <View style={{display: 'flex', flexDirection: 'row', padding: 10}}>
            <TouchableOpacity>
              <Image
                style={{width: 24, height: 24, tintColor: '#25303C'}}
                source={require('../../../assets/icon/facebook.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{
                  width: 24,
                  height: 24,
                  tintColor: '#25303C',
                  marginLeft: 10,
                }}
                source={require('../../../assets/icon/linkedin.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          icon={({color, size}) => (
            <Image
              source={require('../../../assets/icon/log-out.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: '#23303d',
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderWidth: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  emailContainer: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerContent;
