import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";

const COLORS = ["#b58df1", "#fa7f7c"];

export default function SpeechToHonkButton(this: any) {
  const colorIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const longPress = Gesture.LongPress()
    .onBegin(() => {
      scale.value = withTiming(1.2, {
        duration: 500,
        easing: Easing.bezier(0.31, 0.04, 0.03, 1.04),
      });
    })
    .onStart(() => {
      colorIndex.value = withTiming(
        (colorIndex.value + 1) % (COLORS.length + 1),
        { duration: 200 }
      );
    })
    .onFinalize(() => {
      scale.value = withTiming(1, {
        duration: 250,
        easing: Easing.bezier(0.82, 0.06, 0.42, 1.01),
      });
      colorIndex.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorIndex.value,
      [...COLORS.map((_, i) => i), COLORS.length],
      [...COLORS, COLORS[0]]
    ),
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={longPress}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <FontAwesome name="microphone" size={24} color="#fff" />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    padding: 20,
    borderRadius: 25,
  },
});
