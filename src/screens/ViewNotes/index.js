import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import {FAB, List, Colors} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {fetchNotes} from '../../redux/actions';

import Header from '../../components/Header';
import Button from '../../components/Button';

function ViewNotes({navigation}) {
  const noteData = useSelector((state) => state.note.noteData.noteData);
  const dispatch = useDispatch();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [size, setSize] = useState(1);
  const [formErrorMessage, setFormErrorMessage] = useState(
    'ok, we receive data',
  );
  const getData = (size) => {
    dispatch(fetchNotes(size))
      .then((response) => response.data)
      .catch((err) => {
        setFormErrorMessage('There is no data, or problems with receiving it');
        setTimeout(() => {
          setFormErrorMessage('');
        }, 1000);
      });
  };


  useEffect(() => {
    console.log('size', size)
      getData(size);
  }, [size]);

  const footerList = () => {
    return size > noteData.length ? null : (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.loadMore}
          onPress={() =>  setSize(size + 1)}>
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
        {noteData === undefined ? (
          <View style={styles.titleContainer}>
            <ActivityIndicator size="large" color="#60DBC5" />
          </View>
        ) : (
          <FlatList
            data={noteData}
            ListFooterComponent={footerList}
            renderItem={({item}) => (
              <List.Section>
                <List.Accordion
                  title={`${item.name} ${item.lastname}`}
                  left={(props) => <List.Icon {...props} icon="account" />}>
                  <List.Item
                    left={(props) => <List.Icon {...props} icon="phone" />}
                    title={`+${item.phone}`}
                  />
                  <List.Item
                    left={(props) => <List.Icon {...props} icon="email" />}
                    title={item.email}
                  />
                  <List.Item
                    left={(props) => <List.Icon {...props} icon="cake" />}
                    title={item.birthday}
                  />
                </List.Accordion>
                <View style={styles.inlineBlock}>
                  <Button
                    item={item}
                    navigateTo={() =>
                      navigation.navigate('UpdateScreen', {
                        _id: item._id,
                      })
                    }
                  />

                  <Button item={item} Delete />
                </View>
              </List.Section>
            )}
            keyExtractor={(item) => item._id.toString()}
          />
        )}
        <FAB
          icon="plus"
          style={styles.fab}
          small
          color={Colors.white}
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
});

export default ViewNotes;
