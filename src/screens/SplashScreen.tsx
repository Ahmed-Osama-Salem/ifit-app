import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import AnimatedLottieView from "lottie-react-native";
import LottieView from "lottie-react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function Splash() {
  const [appIsReady, setAppIsReady] = useState(false);
  const ref = useRef<AnimatedLottieView>(null);

  useEffect(() => {
    async function prepare() {
      try {
        setTimeout(() => ref.current?.play());

        return () => {
          ref.current?.reset();
        };
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        onLayoutRootView();
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <View style={styles.animationContainer}>
        <LottieView
          ref={ref}
          autoPlay
          source={require("../../assets/logo.json")}
          loop={false}
          // onAnimationFinish={(isCancelled) => console.log(isCancelled)}
          style={{
            width: 240,
            height: 240,
            transform: [{ translateX: -3 }],
          }}
          autoSize
          resizeMode="cover"
          speed={0.9}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    width: "100%",
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F6E117",
  },
});
