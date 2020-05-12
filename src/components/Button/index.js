import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Formik} from 'formik';

import {deleteNote, fetchNotes} from '../../redux/actions';

function ButtonItem({Delete, item, navigateTo}) {
  const dispatch = useDispatch();

  const id = item._id.toString();
  return (
    <>
      {!Delete ? (
        <Button
          icon="rename-box"
          mode="contained"
          style={styles.buttonUpdate}
          onPress={navigateTo}
          >
          Edit
        </Button>
      ) : (
        <Formik
          initialValues={{
            id: id,
          }}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              let dataToSubmit = {
                _id: values.id,
              };
              dispatch(deleteNote(dataToSubmit))
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
            const {values, handleSubmit} = props;
            return (
              <Button
                icon="delete"
                mode="contained"
                style={styles.buttonDelete}
                onPress={handleSubmit}>
                Delete
              </Button>
            );
          }}
        </Formik>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#60DBC5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  buttonDelete: {
    backgroundColor: 'rgb(219, 96, 96)',
    width: '33%',
    margin: 10,
  },
  buttonUpdate: {
    backgroundColor: 'rgb(219, 217, 96)',
    width: '33%',
    margin: 10,
  },
});

export default ButtonItem;
