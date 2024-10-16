import { Overlay } from "@/components/Overlay";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Linking } from "react-native";

export default function About() {
	const [visible, setVisible] = useState(false);
	return (
			<>
			<Pressable 
				onPress={() => setVisible((visible) => !visible)} 
				style={{ position: 'absolute', top: 30, right: 30, zIndex: 1 }}
			>
				<FontAwesome name="info-circle" size={40}/>
			</Pressable>
			<Overlay visible={visible} setVisible={setVisible}>
				<View>
					<Text style={styles.header}>Goose Translator</Text>
					<Text style={styles.paragraph}>Enter some text to produce a *definitely completely accurate* translation in goose language. Features different honk pitches and duration depending on the input text. </Text>
					<Text style={styles.paragraph}>For entertainment purposes only, attempt communication with real-life geese at your own risk.</Text>
					<Text style={styles.paragraph}>
						Source code, privacy policy, and image credits can be found at{' '}
						<Text 
							style={{ color: 'blue', textDecorationLine: 'underline' }} 
							onPress={() => Linking.openURL('https://github.com/lo-maxwell/goose-translator')}
						>
							https://github.com/lo-maxwell/goose-translator.
						</Text>
					</Text>
				</View>
			</Overlay>
			</>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 24, // Adjust the font size for the header
		fontWeight: 'bold', // Make the header bold
		textAlign: 'center', // Center the header text
		marginVertical: 10, // Add vertical margin
	},
	paragraph: {
		fontSize: 16, // Adjust the font size for the paragraph
		textAlign: 'left', // Align the paragraph text to the left
		marginHorizontal: 20, // Add horizontal margin
		marginVertical: 10,
		color: '#333', // Set a color for the paragraph text
	},
});
