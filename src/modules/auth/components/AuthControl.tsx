import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import useTheme from '../../../styles/theme/useTheme';
// import {Pressable} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const AuthControl = () => {
  // const {theme, setTheme} = useTheme();

  const signInWithGoogle = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn
      .then(user => {
        console.log('====================================');
        console.log(user);
        console.log('====================================');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const logOut = () => {
    try {
      auth().signOut();
      console.log('====================================');
      console.log('logout');
      console.log('====================================');
    } catch (err) {
      console.log('====================================');
      console.log(err);
      console.log('====================================');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authHeader}>
        <Text
          style={{
            fontSize: 22,
            // fontFamily: 'Nunito_600SemiBold',
          }}>
          welcome
        </Text>
        <Text
          style={{
            fontSize: 16,
            // fontFamily: 'Nunito_400Regular',
            paddingHorizontal: 90,
            textAlign: 'center',
          }}>
          Click the AdBlock Plus icon in the extension bar
        </Text>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.authButton} onPress={signInWithGoogle}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.authButton}>
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gestContainer}>
        <Text
          style={{
            fontSize: 18,
            // fontFamily: 'Nunito_400Regular',
          }}>
          or
        </Text>
        <TouchableOpacity onPress={logOut}>
          <Text style={{color: '#545F71', textAlign: 'center', fontSize: 18}}>
            sign out
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{backgroundColor: theme.background}}>
        <Pressable
          onPress={() =>
            setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
          }>
          <Text>Change theme</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

export default AuthControl;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  authButton: {
    backgroundColor: '#F6E117',
    borderRadius: 100,
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  buttonText: {color: '#231A16', textAlign: 'center'},
  authHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  socialContainer: {
    flexDirection: 'column',
    marginTop: 30,
    gap: 20,
  },
  gestContainer: {
    flexDirection: 'column',
    marginTop: 30,
    gap: 10,
    alignItems: 'center',
  },
});
