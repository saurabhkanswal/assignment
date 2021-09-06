import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {REMOVE_BOOK_FROM_CART} from '../action/action.types';
import Button from '../components/Button';
import Buttton from '../components/Button';
import Axios from 'axios';

const Cart = ({cartState}) => {
  const {cart} = cartState;
  const dispatch = useDispatch();
  let price = 0;
  const removeBook = ({id}) => {
    dispatch({
      type: REMOVE_BOOK_FROM_CART,
      payload: id,
    });
  };

  const postBook = () => {
    const url = 'https://api.tago.care/assignment/saurabhkanswal';

    const params = JSON.stringify({
      name: 'saurabh',
      total: price,
      books: cart,
    });

    Axios.post(url, params, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(function (response) {
        console.log(response);
        console.log('worked');
      })

      .catch(function (error) {
        console.log(error);
        console.log('FAIL');
      });
  };

  return (
    <View style={{flex: 1}}>
      {cart.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.subHeading}>No Books in a Cart 📚</Text>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ScrollView style={styles.container}>
            <Text style={styles.heading}>Shopping Cart</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.subHeading}>Amount</Text>
            </View>
            <View>
              {cart.map(item => {
                price = price + item.price;
                return (
                  <View style={styles.listContainer} key={item.id}>
                    <View style={styles.listContainerLeft}>
                      <Image
                        source={{
                          uri: item.bookPic,
                        }}
                        style={styles.bookImage}
                      />
                    </View>
                    <View style={styles.listContainerMid}>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Icon
                        name="delete-outline"
                        size={30}
                        color="black"
                        onPress={() => removeBook({id: item.id})}
                      />
                    </View>
                    <View style={styles.listContainerRight}>
                      <Text style={styles.price}>
                        Rs {item.price ? item.price : '0'}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={{width: wp('90%')}}>
              <Text style={styles.titleText}>No. of books: {cart.length}</Text>
              <Text style={styles.titleText}>Total Price: {price}</Text>
            </View>
            <Pressable style={{marginTop: 25}} onPress={() => postBook()}>
              <Buttton title="Buy now" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
  },
  bottomContainer: {
    width: wp('100%'),
    height: hp('25%'),
    backgroundColor: '#e2e2e2',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  listContainerLeft: {
    width: wp('20%'),
  },
  listContainerMid: {
    width: wp('57%'),
  },
  listContainerRight: {
    width: wp('10%'),
  },
  price: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 12,
  },
  titleText: {
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
  },
  listContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    marginTop: 15,
    marginBottom: 15,
  },
  bookImage: {
    width: 80,
    height: 130,
  },
});

const mapStateToProps = state => {
  const {cart} = state;
  return {
    cartState: cart,
  };
};

export default connect(mapStateToProps)(Cart);
