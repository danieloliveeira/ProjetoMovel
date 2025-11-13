import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

type GameHeaderProps = {
  game: {
    name: string;
    coverUrl: string;
    backgroundImageUrl: string;
    studio: string;
    ratingAverage: number;
  };
};

export function GameHeader({ game }: GameHeaderProps) {
  return (
    <ImageBackground
      source={{ uri: game.backgroundImageUrl }}
      style={styles.imageBackground}
      blurRadius={10} 
    >

      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image
            source={{ uri: game.coverUrl }}
            style={styles.cover}
            contentFit="cover"
            transition={300} 
          />

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{game.name}</Text>
            <Text style={styles.studio}>{game.studio}</Text>

            <View style={styles.ratingContainer}>
              <Ionicons name="stats-chart" size={16} color="#66E075" />
              <Text style={styles.ratingText}>
                {game.ratingAverage.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
  },
  overlay: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    padding: 20,
    paddingTop: 40, 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end', 
  },
  cover: {
    width: 100,
    height: 133, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoContainer: {
    flex: 1, 
    marginLeft: 16,
    justifyContent: 'flex-end',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  studio: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    color: '#66E075',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});