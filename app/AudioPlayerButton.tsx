import Button from "@/components/Button";
import React, { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Audio } from "expo-av";

export default function AudioPlayerButton ({inputtedText, gooseName}: {inputtedText: string, gooseName: string}) {

	const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);

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
        require('@/assets/audio/finished/honk-100.mp3'),
        require('@/assets/audio/finished/honk-101.mp3'),
        require('@/assets/audio/finished/honk-102.mp3'),
        require('@/assets/audio/finished/honk-104.mp3'),
        require('@/assets/audio/finished/honk-105.mp3'),
        require('@/assets/audio/finished/honk-108.mp3'),
        require('@/assets/audio/finished/honk-109.mp3'),
        require('@/assets/audio/finished/honk-110.mp3'),
        require('@/assets/audio/finished/honk-111.mp3'),
        require('@/assets/audio/finished/honk-114.mp3'),
        require('@/assets/audio/finished/honk-115.mp3'),
    ];

	const longSoundFiles = [
        require('@/assets/audio/finished/honk-103-long.mp3'),
        require('@/assets/audio/finished/honk-106-long.mp3'),
        require('@/assets/audio/finished/honk-107-long.mp3'),
        require('@/assets/audio/finished/honk-112-long.mp3'),
        require('@/assets/audio/finished/honk-113-long.mp3'),
	]

    // Simple hash function to generate a seed from the word
    const hash = (word: string) => {
        let hashValue = 0;
        for (let i = 0; i < word.length; i++) {
            hashValue += word.charCodeAt(i) * i;
        }
        return hashValue;
    };

    // Play the sound for each word
    for (const word of words) {
      let soundFile;

      const randomIndex = hash(word + gooseName) % soundFiles.length;
      soundFile = soundFiles[randomIndex];
      let isLongHonk = false;
      if (word.length >= 6) {
        const longHonkIndex = hash(word) % 10;
        if (longHonkIndex > 10 - word.length) {
          const randomIndex = hash(word + gooseName) % longSoundFiles.length;
          soundFile = longSoundFiles[randomIndex];
		    isLongHonk = true;
        }
      }

      // Load and play the audio
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setCurrentSound(sound); // Set the current sound

      const playbackRate = 1.0;
      await sound.setRateAsync(playbackRate, true);

      // Play the sound
      await sound.playAsync();

      // Wait for sound to finish playing
      await new Promise<void>((resolve) => {
        let timer: NodeJS.Timeout;

        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            clearTimeout(timer); // Clear the timer if sound finishes
            resolve(); // Resolve the promise when the sound finishes playing
          }
        });

        // // Set a timer to resolve after 250 ms
        // timer = setTimeout(() => {
        //   resolve(); // Resolve the promise after 400 ms
        // }, isLongHonk ? (800) : (400));

        // Get the duration of the sound
        sound.getStatusAsync().then((status) => {
          if (status.isLoaded) {
            const soundDuration = status.durationMillis; // Sound duration in milliseconds

            // Set a timer to resolve after the actual sound duration
            if (!timer) {
              timer = setTimeout(() => {
                resolve(); // Resolve the promise after the sound duration
              }, soundDuration);
            }
          }
        });
      });

      // Optionally unload the sound after playing
      await sound.unloadAsync();
      setCurrentSound(null);
    }
  };

	return (
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
        /> );
}