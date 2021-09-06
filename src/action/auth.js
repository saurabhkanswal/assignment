import auth from '@react-native-firebase/auth';
import {IS_AUTHENTICATED, IS_NEW_USER} from './action.types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signInWithGoogle = () => async dispatch => {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};
