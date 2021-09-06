import React, {useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getBookList} from '../action/Books';

const Home = ({userState, getBookList, bookState, navigation}) => {
  const {user} = userState;

  useEffect(() => {
    getBookList();
  }, []);

  const renderBookList = ({item}) => {
    return (
      <Pressable
        style={styles.listContainer}
        onPress={() =>
          navigation.navigate('BookDescription', {
            bookPic: item.volumeInfo.imageLinks.thumbnail,
            title: item.volumeInfo.title,
            price: item.volumeInfo.pageCount ? item.volumeInfo.pageCount : 0,
            description: item.volumeInfo.description,
            id: item.id,
          })
        }>
        <View style={styles.listContainerLeft}>
          <Image
            source={{
              uri: item.volumeInfo.imageLinks.smallThumbnail,
            }}
            style={styles.bookImage}
          />
        </View>
        <View style={styles.listContainerMid}>
          <Text style={styles.titleText}>{item.volumeInfo.title}</Text>
          <Text style={styles.price}>
            Rs {item.volumeInfo.pageCount ? item.volumeInfo.pageCount : '0'}
          </Text>
        </View>
        <View style={styles.listContainerRight}>
          <Icon name="add" size={30} color="black" />
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={bookState?.book}
      renderItem={renderBookList}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.container}
      ListHeaderComponent={
        <>
          <Text style={styles.subHeading}>Hi, {user.displayName} !</Text>
          <Text style={styles.heading}>List</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    // marginTop: 35,
    backgroundColor: 'white',
  },
  contentContainerStyle: {
    paddingBottom: 25,
    paddingTop: 25,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookImage: {
    width: 100,
    height: 150,
  },
  listContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    marginTop: 15,
    marginBottom: 15,
  },
  titleText: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 17,
  },
  listContainerLeft: {
    width: wp('25%'),
  },
  listContainerMid: {
    width: wp('60%'),
  },
  listContainerRight: {
    width: wp('10%'),
  },
  price: {
    fontWeight: 'bold',
    color: 'grey',
  },
});

const mapStateToProps = state => {
  const {auth, book} = state;
  return {
    userState: auth.user,
    bookState: book,
  };
};

const mapDispatchToProps = {
  getBookList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
