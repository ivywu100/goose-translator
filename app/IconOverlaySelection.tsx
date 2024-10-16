import { StyleSheet, View, Pressable, ImageSourcePropType, Dimensions, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Image } from "expo-image";
import { Overlay } from '@/components/Overlay';
import Button from '@/components/Button';

export default function IconOverlaySelection({
  isVisible,
  setVisible,
  onBackdropPress,
  imgSource,
  setImgSource,
  setGooseName
}: {
  isVisible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onBackdropPress: () => void;
  imgSource: ImageSourcePropType;
  setImgSource: React.Dispatch<React.SetStateAction<ImageSourcePropType>>;
  setGooseName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [images, setImages] = useState<ImageSourcePropType[]>([]);

  useEffect(() => {
    const gooseChoice = require('@/assets/images/gooseSelectionImages/goose-1.jpg');
    const gooseChoice1 = require('@/assets/images/gooseSelectionImages/goose-2.jpg');
    const gooseChoice2 = require('@/assets/images/gooseSelectionImages/goose-3.jpg');
  
    setImages([gooseChoice, gooseChoice1, gooseChoice2]);
  }, [])  
  
  const [mainImgSource, setMainImgSource] = useState<ImageSourcePropType>(imgSource);

  const saveImage = (imgSource: ImageSourcePropType) => {
    setImgSource(imgSource);
    setVisible(!isVisible);
    if (imgSource === images[0]) {
      setGooseName('Fred')
    } else if (imgSource === images[1]) {
      setGooseName('Steve')
    } else {
      setGooseName('Dave')
    }
  };

  const saveMainImage = (imgSource: ImageSourcePropType) => {
    setMainImgSource(imgSource);
  };

  const getGooseName = () => {
    if (mainImgSource === images[0]) {
      return 'Fred'
    } else if (mainImgSource === images[1]) {
      return 'Steve'
    } else {
      return 'Dave'
    }
  }

  const { width } = Dimensions.get('window');
  const isMobile = width < 630;

  const styles = StyleSheet.create({
    overlay: {
    },
    mainImage:{
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 6,
      overflow: "hidden",
      borderColor: "orange",
    },
    gooseName: {
      fontSize: 20, // Increased font size
      fontWeight: 'bold', // Bold text
      textAlign: 'center', // Centered text
      marginTop: 10, // Space above the text
    },
    image: {
      width: isMobile ? 100 : 200,
      height: isMobile ? 100 : 200,
      borderRadius: isMobile ? 50 : 100,
      borderWidth: 3,
      overflow: "hidden",
      marginHorizontal: isMobile ? 5 : 10,
      borderColor: "#0096FF",
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
    modalBackdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0)', // Semi-transparent background
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%', // Adjust width as needed
      height: '60%',
      elevation: 5, // For Android shadow
      shadowColor: '#000', // For iOS shadow
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      zIndex: 1001,
    },
  });

  const imageElements = images.map((img, index) => {
    return  <Pressable key={index} onPress={() => saveMainImage(img)}>
        <Image source={img} style={styles.image} />
        </Pressable> ;
  });

  return (
    <View>
      <Overlay visible={isVisible} setVisible={setVisible}>
        <View style={styles.imagesContainer}>
          <Image source={mainImgSource} style={styles.mainImage} />
          <Text style={styles.gooseName}>{getGooseName()}</Text>
        </View>
        <View style={styles.imageSelectionContainer}>
          {imageElements}
        </View>
        <View>
          <Button label={`Select`} onClickHandler={() => saveImage(mainImgSource)} style={styles.buttonContainer}></Button>
        </View>
      </Overlay>
    </View>
  );
}
