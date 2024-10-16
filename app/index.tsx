import { View, StyleSheet, TextInput, Text, Dimensions, Platform, ImageSourcePropType } from 'react-native';
import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IconButton from './IconButton';
import About from './About';


const { height } = Dimensions.get('window');
const boxHeight = height * 0.2;

export default function Index() {
  const [inputText, setInputText] = React.useState('');
  const [inputtedText, setInputtedText] = useState('');
  const [translationText, setTranslationText] = useState('Translation');
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [gooseName, setGooseName] = useState<string>('Fred');
  const [imgSource, setImgSource] = useState<ImageSourcePropType>(require('@/assets/images/gooseSelectionImages/goose-1.jpg'));

  // Load the audio file
  async function playAudio() {
    if (inputtedText.length === 0) return;

    // Stop the currently playing sound if it exists
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
      setCurrentSound(null); // Reset currentSound to null
    }

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
      const randomIndex = hash(word) % soundFiles.length;
      const soundFile = soundFiles[randomIndex];

      // Load and play the audio
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setCurrentSound(sound); // Set the current sound

      let gooseVoiceModifier = 0;
      switch (gooseName) {
        case 'Fred':
          gooseVoiceModifier = 0;
          break;
        case 'Steve':
          gooseVoiceModifier = -0.15;
          break;
        case 'Dave':
          gooseVoiceModifier = 0.15;
          break;
        default:
          gooseVoiceModifier = 0;
          break;
      }
      const playbackRate = 1.0 + gooseVoiceModifier;
      await sound.setRateAsync(playbackRate, true);

      // Play the sound
      await sound.playAsync();

      // Wait for sound to finish playing
      await new Promise<void>((resolve) => {
        let timer: NodeJS.Timeout;

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
            clearTimeout(timer); // Clear the timer if sound finishes
            resolve(); // Resolve the promise when the sound finishes playing
          }
        });

        // Set a timer to resolve after 250 ms
        timer = setTimeout(() => {
          resolve(); // Resolve the promise after 400 ms
        }, 300 / playbackRate);
      });

      // Optionally unload the sound after playing
      await sound.unloadAsync();
      setCurrentSound(null);
    }
  };

  function translateText() {
    const textArray = inputText.trim().split(/\s+/);
    if (textArray.length === 0 || (textArray.length === 1 && textArray[0] === '')) {
      setTranslationText("Translation");
      setInputtedText("");
      return;
    }
    const honkArray = textArray.map((elem, index) => {
      if (elem.length === 0) return "";
      if (elem.length <= 4) return (elem.charAt(0) == elem.charAt(0).toLowerCase() ? "h" : "H") + "onk";
      return (elem.charAt(0) == elem.charAt(0).toLowerCase() ? "h" : "H") + "o".repeat(Math.floor((elem.length - 2)/3) * 2) + "o".repeat((elem.length - 2) % 3) + "n".repeat(Math.floor((elem.length - 2)/3)) + "k";
    })
    setTranslationText(honkArray.join(" "));
    setInputtedText(inputText);
  }

  return (
    <>
    <View style={styles.container}>
    <About/>
      <View style={styles.imageContainer}>
        <IconButton imgSource={imgSource} setImgSource={setImgSource} setGooseName={setGooseName}/>
        <Text style={styles.gooseName}>{gooseName}</Text>
      </View>
      <TextInput
        style={[styles.input, styles.textInputContainer, ]}
        onChangeText={setInputText}
        value={inputText}
        multiline
        scrollEnabled
        placeholder={inputText.length === 0 ? "Insert Text Here" : ""}
      />
      
      <View style={styles.textInputContainer}>
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
            backgroundColor: "orange",
          }} 
          labelStyle={{ 
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </View>
    </View>
    </>
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
    backgroundColor: '#AEC6CF',
    alignItems: 'center',
    paddingTop: 40,
  },
  gooseName: {
    fontSize: 20, // Increased font size
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Centered text
    marginTop: 10, // Space above the text
  },
  imageContainer: {
    
  },
  textInputContainer: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 20,
    width: '80%',
    height: boxHeight, 
    verticalAlign: 'top'
  },
  translationTextContainer: {
    borderRadius: 20,
    width: '80%',
    height: boxHeight,
    overflow: 'hidden', 
    position: 'relative'
  },
  translationText: {
    height: '100%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
   image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 30,
    alignItems: 'center',
  },
});
