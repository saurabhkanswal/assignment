import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getBookList} from '../action/Books';
import {ADD_BOOK_TO_CART} from '../action/action.types';

const Home = ({userState, getBookList, bookState, navigation, cartState}) => {
  const {user} = userState;
  const dispatch = useDispatch();

  useEffect(() => {
    getBookList();
  }, []);

  const addToCart = ({bookPic, title, price, id}) => {
    dispatch({
      type: ADD_BOOK_TO_CART,
      payload: {
        bookPic,
        title,
        price,
        id,
      },
    });
    ToastAndroid.showWithGravity(
      'Item added to cart',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };
  console.log('pop', cartState.bookIds);
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
          <Icon
            name="add"
            size={30}
            color={
              cartState.bookIds.includes(`${item.id}`) ? 'orange' : 'black'
            }
            onPress={() =>
              addToCart({
                bookPic: item.volumeInfo.imageLinks.thumbnail,
                title: item.volumeInfo.title,
                price: item.volumeInfo.pageCount
                  ? item.volumeInfo.pageCount
                  : 0,
                id: item.id,
              })
            }
          />
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
  const {auth, book, cart} = state;
  return {
    userState: auth.user,
    bookState: book,
    cartState: cart,
  };
};

const mapDispatchToProps = {
  getBookList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
