import React from 'react';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';
import {connect} from 'react-redux';
import {signInWithGoogle} from '../action/auth';
import {useDispatch} from 'react-redux';
import {IS_AUTHENTICATED, SET_USER} from '../action/action.types';

const WelcomeScreen = ({signInWithGoogle}) => {
  const dispatch = useDispatch();

  const signIn = () => {
    console.log('pressaed');
    signInWithGoogle().then(data => {
      console.log(data);
      dispatch({
        type: SET_USER,
        payload: data,
      });
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WELCOME</Text>
      <Pressable style={styles.buttonContainer} onPress={() => signIn()}>
        <Image
          source={{
            uri: 'https://cdn.iconscout.com/icon/free/png-64/google-160-189824.png',
          }}
          style={styles.googleLogo}
        />
        <Text style={styles.subHeading}>Continue with Google</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: 10,
    width: 350,
  },
  googleLogo: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '600',
  },
});

const mapDispatchToProps = {
  signInWithGoogle,
};

export default connect(null, mapDispatchToProps)(WelcomeScreen);
