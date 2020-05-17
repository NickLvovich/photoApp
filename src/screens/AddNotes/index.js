import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {View, StyleSheet, ScrollView, Image, Text} from 'react-native';
import {IconButton, TextInput, Button, FAB} from 'react-native-paper';

import ImagePicker from 'react-native-image-picker';

import {submitPhotos, fetchPhotos} from '../../redux/actions';
import {Formik} from 'formik';

import Header from '../../components/Header';

function AddNotes({navigation}) {
  const [avatarSource, setAvatarSource] = useState();
  const dispatch = useDispatch();

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
          setAvatarSource(response.uri);
        }
      },
    );
  };

  console.log('avatarSource', avatarSource);
  return (
    <>
      <Header titleText="Add a new info about friend" />
      <ScrollView style={styles.container}>
        {avatarSource && (
          <Image
            resizeMode={'contain'}
            source={{uri: avatarSource}}
            style={styles.img}
          />
        )}
        <FAB label="Find Photo" style={styles.fab} onPress={selectImage} />

        <Formik
          initialValues={{
            img: avatarSource,
          }}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              let dataToSubmit = {
                img: avatarSource,
              };
              dispatch(submitPhotos(dataToSubmit))
                .then((response) => response.payload)
                .catch((err) => {
                  setTimeout(() => {
                    setFormErrorMessage(
                      'There is no data, or problems with receiving it',
                    );
                  }, 1000);
                });
              dispatch(fetchPhotos())
                .then((response) => response.data)
                .catch((err) => {
                  setFormErrorMessage(
                    'There is no data, or problems with receiving it',
                  );
                  setTimeout(() => {
                    setFormErrorMessage('');
                  }, 1000);
                });
              setSubmitting(false);
            }, 500);
          }}>
          {(props) => {
            const {touched, errors, isSubmitting, handleSubmit} = props;
            return (
              <View>
                {touched.name && errors.name && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.name}
                  </Text>
                )}
                <FAB
                  style={styles.fab}
                  small
                  label="apply"
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
              </View>
            );
          }}
        </Formik>
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
  img: {
    alignSelf: 'stretch',
    width: '100%',
    height: 300,
  },
});

export default AddNotes;
