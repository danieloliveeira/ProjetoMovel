import React from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

type BackGroundImageProps = {
    children: React.ReactNode;
}

const BackGroundImage: React.FC<BackGroundImageProps> = ({ children }) => {
    return (
        <ImageBackground
            source={require('../assets/images/backGroundImage.png')}
            style={styles.background}
        >
            <View style={styles.overlay}/>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {children}
            </KeyboardAvoidingView>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: 'auto',
    height: 'auto'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)', 
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
})

export default BackGroundImage