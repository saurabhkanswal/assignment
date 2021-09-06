import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import {useDispatch} from 'react-redux';
import {ADD_BOOK_TO_CART} from '../action/action.types';

const BookDescription = ({route, navigation}) => {
  const {bookPic, title, price, description, id} = route.params;
  const dispatch = useDispatch();
  const buybook = () => {
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
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={[styles.header, styles.marginSmall]}>
          <Icon
            name="arrow-back-ios"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={[styles.content, styles.marginSmall]}>
          <Image
            source={{
              uri: bookPic,
            }}
            style={[styles.bookImage, styles.marginSmall]}
          />
          <Text style={[styles.titleText, styles.marginSmall]}>{title}</Text>
          <Text style={[styles.price, styles.marginSmall]}>Rs {price}</Text>
          <Text style={[styles.description, styles.marginSmall]}>
            {description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Pressable onPress={() => buybook()}>
          <Button title="Add to Cart" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
  },
  bookImage: {
    width: wp('45%'),
    height: hp('35%'),
  },
  content: {
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'grey',
  },
  description: {
    fontSize: 17,
    color: 'grey',
  },
  marginSmall: {
    marginBottom: 15,
  },
  bottomContainer: {
    alignItems: 'center',
    height: hp('9%'),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default BookDescription;
