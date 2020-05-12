import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {View, StyleSheet, ScrollView, Image, Button, Text} from 'react-native';
import {IconButton, TextInput, FAB} from 'react-native-paper';

import ImagePicker from 'react-native-image-picker';

import {submitNote, fetchNotes} from '../../redux/actions';

import Header from '../../components/Header';

function AddNotes({navigation}) {
  const [avatarSource, setAvatarSource] = useState(null);
  const selectImage = async () => {
    ImagePicker.showImagePicker(
      {noData: true, mediaType: 'photo'},
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          setAvatarSource(response.uri)
        }
      },
    );
  };
  console.log('avatarSource', avatarSource)
  return (
    <>
      <Header titleText="Add a new info about friend" />
      <ScrollView style={styles.container}>
        {avatarSource && (
          <Image source={{uri:avatarSource}} style={{width: '80%', height: 200, resizeMode: 'contain'}} />
        )}
        <Button title="Select Image" onPress={selectImage} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'relative',
    margin: 20,
    right: 0,
    bottom: 0,
  },
});

export default AddNotes;
