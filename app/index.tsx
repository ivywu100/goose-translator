import { View, StyleSheet, TextInput, Text, Dimensions, Platform } from 'react-native';
import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const PlaceholderImage = require('@/assets/images/background-image.png');

const { height } = Dimensions.get('window');
const boxHeight = height * 0.2;

export default function Index() {
  const [inputText, setInputText] = React.useState('Insert Text Here');
  const [inputtedText, setInputtedText] = useState('');
  const [translationText, setTranslationText] = useState('');

  // Load the audio file
  async function playAudio() {
    if (inputtedText.length === 0) return;

    const words = inputtedText.trim().split(/\s+/);

    // Array of sound files
    const soundFiles = [
        require('@/assets/audio/honk-0.mp3'),
        require('@/assets/audio/honk-1.mp3'),
        require('@/assets/audio/honk-2.mp3'),
        require('@/assets/audio/honk-3.mp3'),
        require('@/assets/audio/honk-4.mp3'),
        require('@/assets/audio/honk-5.mp3'),
    ];

    // Simple hash function to generate a seed from the word
    const hash = (word: string) => {
        let hashValue = 0;
        for (let i = 0; i < word.length; i++) {
            hashValue += word.charCodeAt(i);
        }
        return hashValue;
    };

    // Play the sound for each word
    for (const word of words) {
        // Generate a random index based on the hash of the word
        const randomIndex = hash(word) % soundFiles.length; // Ensure the index is within bounds
        const soundFile = soundFiles[randomIndex]; // Select the sound file using the random index

        // Load and play the audio
        const { sound } = await Audio.Sound.createAsync(soundFile);

        // Play the sound
        await sound.playAsync();

        // Wait for the sound to finish before playing the next one
        await new Promise<void>((resolve) => {
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    resolve(); // Resolve the promise when the sound finishes playing
                }
            });
        });

        // Unload the sound to free up resources
        await sound.unloadAsync();
    }
  };

  function translateText() {
    const textArray = inputText.trim().split(/\s+/);
    const honkArray = textArray.map((elem, index) => {
      if (elem.length === 0) return "";
      if (elem.length <= 4) return "honk";
      return "h" + "o".repeat(Math.floor((elem.length - 3)/3) * 2) + "o".repeat(elem.length % 3) + "n".repeat(Math.floor((elem.length - 3)/3)) + "k";
    })
    setTranslationText(honkArray.join(" "));
    setInputtedText(inputText);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage}/>
      </View>
      <TextInput
        style={[styles.input, styles.textInputContainer, { width: '80%', height: boxHeight, verticalAlign: 'top' }]}
        onChangeText={setInputText}
        value={inputText}
        multiline
        scrollEnabled
      />
      
      <View style={{ width: '80%', height: boxHeight, overflow: 'hidden', position: 'relative' }}>
        <Text style={[styles.translationText]}>{translationText}</Text>
        <Button 
          onClickHandler={playAudio} 
          icon={<FontAwesome name="bullhorn" size={24} color="#25292e" />}
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            borderWidth: 2,
            borderRadius: 10,
          }} 
        /> 
      </View>   
      <View style={styles.footerContainer}>
        <Button 
          label="Translate" 
          onClickHandler={translateText} 
          style={{
            paddingVertical: 25,
            paddingHorizontal: 50,
          }} 
          labelStyle={{ fontSize: 18 }}
        />
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
    marginTop: 10,
    alignItems: 'center',
  },
});
