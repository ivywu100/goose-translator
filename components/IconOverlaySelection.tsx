import { StyleSheet, View, Pressable,Text, ImageSourcePropType } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from "expo-image";
import {Overlay } from 'react-native-elements';
import Button from './Button';

type Props = {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onBackdropPress: () => void;
  iconImage: ImageSourcePropType;
  setImgSource: React.Dispatch<React.SetStateAction<ImageSourcePropType>>;
}


export default function IconOverlaySelection({
  isVisible,
  setVisible,
  onBackdropPress,
  iconImage,
  setImgSource
}: Props) {
  const [images, setImages] = useState<ImageSourcePropType[]>([]);

  useEffect(() => {
    const gooseChoice = require('@/assets/images/gooseSelectionImages/background-image.png');
    const gooseChoice1 = require('@/assets/images/gooseSelectionImages/placeholder-1.jpg');
    const gooseChoice2 = require('@/assets/images/gooseSelectionImages/placeholder-2.jpg');
  
    setImages([gooseChoice, gooseChoice1, gooseChoice2]);
  }, [])
  
  
  const [mainImgSource, setMainImgSource] = useState<ImageSourcePropType>(iconImage);

  const saveImage = (imgSource: ImageSourcePropType) => {
    setImgSource(imgSource);
    setVisible(!isVisible);
  };

  const saveMainImage = (imgSource: ImageSourcePropType) => {
    setMainImgSource(imgSource);
  };

  const imageElements = images.map((img, index) => {
    return  <Pressable key={index} onPress={() => saveMainImage(img)}>
        <Image source={img} style={styles.image} />
        </Pressable> ;
  });

  return (
    <View>
      <Overlay isVisible={isVisible} onBackdropPress={onBackdropPress} overlayStyle={styles.overlay}>
        <View style={styles.imagesContainer}> {/* Centering container */}
          <Image source={mainImgSource} style={styles.mainImage} />
        </View>
        <View style={styles.imageSelectionContainer}>
          {imageElements}
        </View>

        <View >
          <Button label={`Submit`} onClickHandler={() => saveImage(mainImgSource)} style={styles.buttonContainer}></Button>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
  },
  mainImage:{
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    overflow: "hidden",
    borderColor: "red",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  imageSelectionContainer: {
    flexDirection: 'row',
    padding: 20,
    
  },
  imagesContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    backgroundColor:"orange",
    borderRadius: 10, 
    fontSize: 16,
  },
});


