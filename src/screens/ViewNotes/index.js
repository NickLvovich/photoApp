import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {FAB, List, Colors} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {fetchPhotos} from '../../redux/actions';

import Header from '../../components/Header';
import Button from '../../components/Button';

function ViewNotes({navigation}) {
  const photoData = useSelector((state) => state.note.photoData.photoData);
  const dispatch = useDispatch();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [size, setSize] = useState(1);
  const [formErrorMessage, setFormErrorMessage] = useState(
    'ok, we receive data',
  );
  const getData = (size) => {
    dispatch(fetchPhotos(size))
      .then((response) => response.data)
      .catch((err) => {
        setFormErrorMessage('There is no data, or problems with receiving it');
        setTimeout(() => {
          setFormErrorMessage('');
        }, 1000);
      });
  };

  useEffect(() => {
    getData(size);
  }, [size]);

  console.log('photoData', photoData);

  const footerList = () => {
    return size > photoData.length ? null : (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.loadMore}
          onPress={() => setSize(size + 1)}>
          <Text style={styles.textBtn}>Load More</Text>
          {isLoadMore ? (
            <ActivityIndicator color="white" size="large" animating />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Header titleText="Simple Friend list" />
      <View style={styles.container}>
        {photoData === undefined ? (
          <View style={styles.titleContainer}>
            <Text style={{fontSize: 24}}>There is no data</Text>
          </View>
        ) : (
          <FlatList
            data={photoData}
            ListFooterComponent={footerList}
            renderItem={({item}) => (
              <View style={styles.inlineBlock}>
                <Image
                  resizeMode={'contain'}
                  source={{uri:item.img}}
                  style={styles.img}
                />
              </View>
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
        <FAB
          style={styles.fab}
          color={Colors.white}
          label="add new"
          onPress={() => navigation.navigate('AddNotes')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
    fontSize: 16,
  },
  listTitle: {
    fontSize: 20,
  },
  iconStyle: {
    zIndex: 10,
  },
  mainBlock: {
    flex: 1,
  },
  inlineBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'grey',
  },
  textBtn: {
    fontSize: 15,
    marginRight: 5,
    color: 'white',
  },
  img: {
    alignSelf: 'stretch',
    width: '100%',
    height: 300,
  },
});

export default ViewNotes;
