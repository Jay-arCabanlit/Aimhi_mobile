import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomActionButton from '../../components/CustomActionButton/CustomActionButton';
import CustomButton from '../../components/CustomButton/CustomButton';
import ContactScreen from '../ContactScreen/ContactScreen';
import TermsOfUseScreen from '../TermsOfUseScreen/TermsOfUseScreen';
import PrivacyScreen from '../PrivacyScreen/PrivacyScreen';
import {useSelector, useDispatch} from 'react-redux';

const ProfileScreen = () => {
  const [screen, setScreen] = useState('Index');
  const {user_id, company_id, network_status, full_name, email, profile_link} =
    useSelector(state => state.loginReducer);
  const Sync = () => {
    console.log('hello');
  };
  const Help = () => {
    console.log('help');
  };

  const back = () => {
    setScreen('Index');
  };

  return (
    <View>
      {screen == 'Index' && (
        <ScrollView>
          <View style={styles.container}>
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

            <Text style={{fontSize: 16, fontWeight: '500', marginTop: 16}}>
              {full_name}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'normal', marginTop: 8}}>
              {email}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>Sync</Text>
            <CustomActionButton
              onPress={Sync}
              text="Sync Data"
              iconImage="reload"
            />

            <Text style={styles.actionText}>About</Text>
            <CustomActionButton
              onPress={Help}
              text="Help"
              iconImage="question"
            />
            <CustomActionButton
              onPress={() => setScreen('ContactSupport')}
              text="Contact Support"
              iconImage="message"
            />
            <CustomActionButton
              onPress={() => setScreen('Privacy')}
              text="Privacy"
              iconImage="lock"
            />
            <CustomActionButton
              onPress={() => setScreen('TermOfUse')}
              text="Term of Use"
              iconImage="newsPaperFolded"
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
              We love hearing from you and we hope you’d share your experience
              in using the app.
            </Text>
            <View style={{width: '100%', marginTop: 20}}>
              <CustomButton
                text="Email Us"
                onPress={() => setScreen('EmailUs')}
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
        </ScrollView>
      )}
      {(screen == 'ContactSupport' || screen == 'EmailUs') && (
        <View>
          <View style={{width: 60}}>
            <CustomButton text="Back" onPress={back} type="LINK" />
          </View>

          <ContactScreen
            Screen="ProfileScreen"
            defaultVal={screen == 'ContactSupport' ? '2' : '3'}
          />
        </View>
      )}
      {screen == 'Privacy' && (
        <View>
          <View style={{width: 60}}>
            <CustomButton text="Back" onPress={back} type="LINK" />
          </View>
          <PrivacyScreen />
        </View>
      )}
      {screen == 'TermOfUse' && (
        <View>
          <View style={{width: 60}}>
            <CustomButton text="Back" onPress={back} type="LINK" />
          </View>
          <TermsOfUseScreen />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    padding: 10,
    fontSize: 16,
    color: '#707070',
    fontWeight: 'normal',
    marginTop: 32,
    marginLeft: 34,
  },
  actionContainer: {
    backgroundColor: '#DEDEE133',
    paddingBottom: 44,
  },

  emailContainer: {
    padding: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
