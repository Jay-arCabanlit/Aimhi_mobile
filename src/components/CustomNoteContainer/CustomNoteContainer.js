import {View, Text, StyleSheet, Image, Button} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import CustomButton from '../CustomButton/CustomButton';
import FbGrid from 'react-native-fb-image-grid';
import RNImageVideoGridViewer from '@leafletui/rn-image-video-grid-viewer';

const CustomNoteContainer = () => {
  const back = async () => {};

  // const bottomSheetRef = useRef < BottomSheet > null;

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(() => {
    console.log('handleSheetChanges', index);
  }, []);
  const onPress = (url, index, event) => {
    // url and index of the image you have clicked alongwith onPress event.
  };
  return (
    <View style={styles.container}>
      <View style={styles.notesBox}>
        <View style={styles.content}>
          <View style={styles.headerContent}>
            <View style={{width: '50%'}}>
              <Text style={{color: '#747070', fontSize: 12, textAlign: 'left'}}>
                Juan dela Crux
              </Text>
            </View>
            <View style={{textAlign: 'right', width: '50%'}}>
              <Text
                style={{color: '#747070', fontSize: 12, textAlign: 'right'}}>
                01-jan-2022
              </Text>
            </View>
          </View>
          <View style={styles.inner_container}>
            <RNImageVideoGridViewer
              images={[
                {
                  url: 'https://images.unsplash.com/photo-1580465446361-8aae5321522b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'image',
                  videoThumbnail: null,
                },
                {
                  url: 'https://images.unsplash.com/photo-1529123202249-4f6224196c9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxlJTIwYmxhY2slMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'video',
                  videoThumbnail:
                    'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                },
                {
                  url: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80',
                  type: 'image',
                  videoThumbnail: null,
                },
                {
                  url: 'https://images.unsplash.com/photo-1529123202249-4f6224196c9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxlJTIwYmxhY2slMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'video',
                  videoThumbnail:
                    'https://images.unsplash.com/photo-1529123202249-4f6224196c9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxlJTIwYmxhY2slMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                },
                {
                  url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
                  type: 'image',
                  videoThumbnail: null,
                },
                {
                  url: 'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'video',
                  videoThumbnail:
                    'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                },
                {
                  url: 'https://images.unsplash.com/photo-1529123202249-4f6224196c9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtaWxlJTIwYmxhY2slMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'image',
                  videoThumbnail: null,
                },

                {
                  url: 'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'video',
                  videoThumbnail:
                    'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                },
                {
                  url: 'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                  type: 'video',
                  videoThumbnail:
                    'https://images.unsplash.com/photo-1601831698630-a814370b9cca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c21pbGUlMjBnaXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
                },
              ]}
              onPress={item => {
                console.log(
                  item,
                  'selected image properties',
                  item.type,
                  'video/image',
                );
              }}
              style={{}}
              playIconHeight={50}
              playIconWidth={50}
            />
          </View>
          <View style={styles.notesContainer}>
            <Text style={{color: '#23303D', fontSize: 14}}>
              Accusantium vitae expedita quia quia velit vitae soluta. Minus
              asperiores voluptatem voluptatem est.
            </Text>
            <View style={styles.headerContent}>
              <View
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../../assets/icon/safety.png')}
                  style={{width: 12, height: 12, tintColor: '#649569'}}
                />
                <Text style={{marginLeft: 5, color: '#649569', fontSize: 12}}>
                  10
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{color: '#649569', textAlign: 'right', fontSize: 12}}>
                  2 replies
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <Image
                source={require('../../../assets/icon/safety.png')}
                style={{
                  width: 12,
                  height: 12,
                  tintColor: '#3B74BE',
                  marginTop: 19,
                  marginLeft: 10,
                }}
              />
            </View>
            <View>
              <CustomButton text="Like" onPress={back} type="LINK" />
            </View>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View>
              <Image
                source={require('../../../assets/icon/reply.png')}
                style={{
                  width: 12,
                  height: 12,
                  tintColor: '#3B74BE',
                  marginTop: 19,
                  marginLeft: 10,
                }}
              />
            </View>
            <View>
              <CustomButton text="Reply" onPress={back} type="LINK" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  notesBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#DEDEE1',
    width: '100%',
  },
  content: {
    padding: 10,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  notesContainer: {
    marginTop: 10,
  },
  actionContainer: {
    display: 'flex',
    borderTopColor: '#DEDEE1',
    borderTopWidth: 0.5,
    flexDirection: 'row',
  },
  inner_container: {
    width: '100%',
    height: '60%',
  },
});

export default CustomNoteContainer;
