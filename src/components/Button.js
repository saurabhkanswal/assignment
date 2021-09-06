import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Buttton = ({title}) => (
  <View style={styles.button}>
    <Text style={{color: 'white', fontSize: 18}}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  button: {
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default Buttton;
