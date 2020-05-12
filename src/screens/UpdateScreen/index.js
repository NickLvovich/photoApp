import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {View, StyleSheet, ScrollView, Button, Text} from 'react-native';
import {IconButton, TextInput, FAB} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {updateNote, fetchNotes} from '../../redux/actions';

import Header from '../../components/Header';

function UpdateScreen({navigation}) {
  const _id = navigation.state.params._id
  const [formErrorMessage, setFormErrorMessage] = useState(
    'ok, we receive data',
  );
  const dispatch = useDispatch();

  const onSaveNote = () => {
    setTimeout(() => {
    navigation.goBack();
    }, 1000);
  }

  return (
    <>
      <Header titleText="Update your friend" />
      <IconButton
        icon="close"
        size={25}
        color="white"
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      />
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            _id: _id,
            name: '',
            lastname: '',
            phone: '',
            email: '',
            birthday: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
            lastname: Yup.string().required('Last Name is required'),
            email: Yup.string()
              .required('Email is required'),
            phone: Yup.number()
              .required('Last Phone is required')
              .min(9, 'Password must be at least 9 characters'),
            birthday: Yup.string().required('birthday is required').min(6, 'Birthday must be at least 12 characters'),
          })}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              let dataToSubmit = {
                _id: _id,
                name: values.name,
                lastname: values.lastname,
                phone: values.phone,
                email: values.email,
                birthday: values.birthday,
              };
              dispatch(updateNote(dataToSubmit))
                .then((response) => response.payload)
                .catch((err) => {
                  setTimeout(() => {
                    setFormErrorMessage(
                      'There is no data, or problems with receiving it',
                    );
                  }, 1000);
                });
                dispatch(fetchNotes())
                .then((response) => response.data)
                .catch((err) => {
                  setFormErrorMessage('There is no data, or problems with receiving it');
                  setTimeout(() => {
                    setFormErrorMessage('');
                  }, 1000);
                });
              setSubmitting(false);
            }, 500);
          }}>
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldTouched
            } = props;
            return (
              <View>
                {touched.name && errors.name && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.name}
                  </Text>
                )}
                <TextInput
                  label="Add name here"
                  mode="outlined"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  style={styles.title}
                  onBlur={() => setFieldTouched('name')}
                />
                {touched.lastname && errors.lastname && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.lastname}
                  </Text>
                )}
                <TextInput
                  label="Add last name here"
                  mode="outlined"
                  onChangeText={handleChange('lastname')}
                  style={styles.title}
                  value={values.lastname}
                  onBlur={() => setFieldTouched('lastname')}
                />
                {touched.phone && errors.phone && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.phone}
                  </Text>
                )}
                <TextInput
                  label="Add phone here"
                  mode="outlined"
                  onChangeText={handleChange('phone')}
                  style={styles.title}
                  value={values.phone}
                  onBlur={() => setFieldTouched('phone')}
                />
                {touched.email && errors.email && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  label="Add email here"
                  mode="outlined"
                  onChangeText={handleChange('email')}
                  style={styles.title}
                  value={values.email}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.birthday && errors.birthday && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.birthday}
                  </Text>
                )}
                <TextInput
                  label="Add birthday here"
                  mode="outlined"
                  onChangeText={handleChange('birthday')}
                  style={styles.title}
                  value={values.birthday}
                  onBlur={() => setFieldTouched('birthday')}
                />

                <FAB
                  style={styles.fab}
                  small
                  label="update"
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
    color: '#fff',
    margin: 20,
    right: 0,
    bottom: 0,
  },
});

export default UpdateScreen;
