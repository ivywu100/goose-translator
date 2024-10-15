import { StyleSheet, View, Pressable, ImageSourcePropType } from 'react-native';
import { Image } from "expo-image";
import React, { useState } from 'react';
import IconOverlaySelection from './IconOverlaySelection';

export default function IconButton() {

  const PlaceholderImage = require('@/assets/images/gooseSelectionImages/background-image.png');

  const [visible, setVisible] = useState(false);
  const [imgSource, setImgSource] = useState<ImageSourcePropType>(PlaceholderImage);

  const openIconWindow = () => {
    setVisible(!visible);
  };

  const buttonContent = (
    <Image source={imgSource} style={styles.image} />
  );

  return (
    <View>
      <Pressable
        onPress={openIconWindow}
      >
      {buttonContent}
      </Pressable>
        <IconOverlaySelection isVisible={visible} setVisible= {setVisible} onBackdropPress={openIconWindow} iconImage={imgSource} setImgSource = {setImgSource}/>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    overflow: "hidden"
  }
});



