/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import {StatusBar} from 'react-native';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {useRef} from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import AuthControl from '../components/AuthControl';
import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';

const AuthScreen = () => {
  const windowHeight = Dimensions.get('window').height;
  const height = useSharedValue(70); // Initial height value
  const translateY = useSharedValue(-20); // Initial translateY value
  const translateYLogo = useSharedValue(windowHeight / 5);
  const ref = useRef<AnimatedLottieView>(null);
  const animatedValue = useSharedValue(0);

  // yellow bg up
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${height.value}%`,
      zIndex: 9,
      position: 'absolute',
      width: '100%',
    };
  });

  // yellow bg down
  const animatedStyleY = useAnimatedStyle(() => {
    return {transform: [{translateY: translateY.value}], zIndex: 1};
  });

  // logo
  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYLogo.value}],
    };
  });

  //text
  const animatedText = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  //auth content
  const animatedAuth = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

  const startAnimation = () => {
    height.value = withTiming(40, {duration: 1000});
    translateY.value = withTiming(600, {duration: 1000});
    translateYLogo.value = withTiming(0, {duration: 1000});
    animatedValue.value = withSequence(
      withTiming(1, {duration: 1000}),
      withTiming(1, {duration: 0}),
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F6E117'} />
      <View style={styles.authContainer}>
        <Animated.View
          style={[
            {
              // zIndex: 1,
              position: 'absolute',
              width: '100%',
            },
            animatedStyle,
          ]}>
          <ImageBackground
            source={require('../../../../assets/RectanglePNG.png')}
            resizeMode="cover"
            style={{height: 'auto', width: 'auto', paddingBottom: 35}}>
            <SafeAreaView style={styles.logoContainer}>
              <Animated.View style={[{zIndex: 20}, animatedLogo]}>
                <LottieView
                  ref={ref}
                  autoPlay
                  source={require('../../../../assets/logo.json')}
                  loop={false}
                  onAnimationFinish={isCancelled => {
                    if (!isCancelled) {
                      startAnimation();
                    }
                  }}
                  style={styles.lottieStyle}
                  autoSize
                  resizeMode="cover"
                  speed={0.85}
                />
              </Animated.View>
              <Animated.Text
                style={[
                  {
                    fontSize: 40,
                    fontFamily: 'Nunito-Bold',
                    color: '#231A16',
                    letterSpacing: 10,
                    transform: [{translateY: -40}],
                  },
                  animatedText,
                ]}>
                IFIT
              </Animated.Text>
            </SafeAreaView>
          </ImageBackground>
          <Animated.View
            style={[
              {
                width: '100%',
                position: 'relative',
                zIndex: 0,
              },
              ,
              animatedStyleY,
            ]}>
            <Image source={require('../../../../assets/RecDown.png')} />
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.authControlContainer, animatedAuth]}>
          <AuthControl />
        </Animated.View>
      </View>
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  authContainer: {
    position: 'relative',
    backgroundColor: '#F6E117',
    height: '100%',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 20,
  },
  lottieStyle: {
    width: 240,
    height: 240,
    transform: [{translateX: -7}],
    zIndex: 20,
  },
  authControlContainer: {
    backgroundColor: '#FFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 240,
    height: '100%',
  },
});
