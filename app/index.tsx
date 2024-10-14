import { View, StyleSheet, TextInput, Text, Dimensions, Platform } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import React from 'react';
import { Audio } from 'expo-av';

const PlaceholderImage = require('@/assets/images/background-image.png');

const { height } = Dimensions.get('window');
const boxHeight = height * 0.2;

export default function Index() {
  const [text, onChangeText] = React.useState('Insert Text Here');

  // Load the audio file
  async function playAudio() {
    // Load and play the audio
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/honk-sound.mp3') // Adjust the path if necessary
    );
    await sound.playAsync(); // Play the sound
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage}/>
      </View>
      <TextInput
        style={[styles.input, styles.textInputContainer, { width: '80%', height: boxHeight }]}
        onChangeText={onChangeText}
        value={text}
        multiline
        scrollEnabled
      />
      
      <View style={{ width: '80%', height: boxHeight, overflow: 'hidden' }}>
        <Text style={[styles.translationText]}>Placeholder Translation Text</Text>
      </View> 
      <View style={styles.footerContainer}>
        <Button label="Translate" onClickHandler={() => {alert("Translating text: " + text)}}/>
        <Button theme="primary" label="Play audio" onClickHandler={playAudio}/> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
     alignItems: 'center',
  },
  imageContainer: {
  },
  textInputContainer: {
    backgroundColor: "#ffffff",
  },
  translationText: {
    height: '100%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
   image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    alignItems: 'center',
  },
});
