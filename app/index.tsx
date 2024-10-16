import { View, StyleSheet, TextInput, Text, Dimensions, Platform, ImageSourcePropType } from 'react-native';
import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import IconButton from './IconButton';
import About from './About';
import AudioPlayerButton from './AudioPlayerButton';


const { height } = Dimensions.get('window');
const boxHeight = height * 0.2;

export default function Index() {
  const [inputText, setInputText] = React.useState('');
  const [inputtedText, setInputtedText] = useState('');
  const [translationText, setTranslationText] = useState('Translation');
  const [gooseName, setGooseName] = useState<string>('Fred');
  const [imgSource, setImgSource] = useState<ImageSourcePropType>(require('@/assets/images/gooseSelectionImages/goose-1.jpg'));
  

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
        <AudioPlayerButton inputtedText={inputtedText} gooseName={gooseName}/>
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
