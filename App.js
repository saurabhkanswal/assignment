import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Store from './Store';
import Route from './Route';
import {Provider} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '60376515916-473ni4q70aj9u5kcbbf2a60vfqhumj31.apps.googleusercontent.com',
    });
  }, []);
  return (
    <Provider store={Store}>
      <Route />
    </Provider>
  );
};

export default App;
