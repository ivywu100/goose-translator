import React, { ReactNode, useEffect, useRef } from 'react';
import { View, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';

export function Overlay({ visible, setVisible, children }: { visible: boolean; setVisible: Function; children: ReactNode }) {
    const overlayRef = useRef<View>(null); // Create a ref for the overlay area

    const handleClickOutside = () => {
        setVisible(false);
    };

    return (
        <Modal transparent={true} visible={visible} animationType="fade">
            <TouchableWithoutFeedback onPress={handleClickOutside}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.overlayArea} ref={overlayRef}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayArea: {
        backgroundColor: 'white',
        padding: 16, // Adjust padding as needed
        borderRadius: 8, // Adjust border radius as needed
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
});
