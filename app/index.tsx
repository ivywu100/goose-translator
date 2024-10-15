import { View, StyleSheet, TextInput, Text, Dimensions, Platform } from 'react-native';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import React, { useState } from 'react';
import { Audio } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const { height } = Dimensions.get('window');
const boxHeight = height * 0.2;

export default function Index() {
  const [inputText, setInputText] = React.useState('Insert Text Here');
  const [translationText, setTranslationText] = useState('');

  // Load the audio file
  async function playAudio() {
    // Load and play the audio
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/audio/honk-sound.mp3') 
    );
    await sound.playAsync(); // Play the sound
  };

  function translateText() {
    const textArray = inputText.trim().split(/\s+/);
    const honkArray = textArray.map((elem, index) => {
      if (elem.length <= 4) return "honk";
      return "h" + "o".repeat(Math.floor((elem.length - 3)/3) * 2) + "o".repeat(elem.length % 3) + "n".repeat(Math.floor((elem.length - 3)/3)) + "k"; // Updated to reflect the new logic
    })
    setTranslationText(honkArray.join(" "));
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <IconButton/>
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
            borderWidth: 2, // Set border width for this button
            borderRadius: 10, // Set border radius for rounded corners
          }} 
        /> 
      </View>   
      <View style={styles.footerContainer}>
        <Button 
          label="Translate" 
          onClickHandler={translateText} 
          style={{
            paddingVertical: 25, // Increase vertical padding
            paddingHorizontal: 50, // Increase horizontal padding
            backgroundColor: "#ffffff",
          }} 
          labelStyle={{ fontSize: 18 }} // Increase font size for the label
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
    alignItems: 'center',
  },
});
