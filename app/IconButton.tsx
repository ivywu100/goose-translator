import { StyleSheet, View, Pressable, ImageSourcePropType } from 'react-native';
import { Image } from "expo-image";
import React, { useState } from 'react';
import IconOverlaySelection from './IconOverlaySelection';

export default function IconButton({imgSource, setImgSource,setGooseName}: {imgSource: ImageSourcePropType, setImgSource: React.Dispatch<React.SetStateAction<ImageSourcePropType>>, setGooseName: React.Dispatch<React.SetStateAction<string>>}) {

  const [visible, setVisible] = useState(false);

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
        <IconOverlaySelection isVisible={visible} setVisible= {setVisible} onBackdropPress={openIconWindow} imgSource={imgSource} setImgSource = {setImgSource} setGooseName={setGooseName}/>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "orange",
    overflow: "hidden"
  }
});



