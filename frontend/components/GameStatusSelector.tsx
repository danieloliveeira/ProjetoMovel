import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type StatusSelectorProps = {
  currentStatus: 'played' | 'playing' | 'backlog' | 'wishlist' | null;
  onStatusChange: (status: 'played' | 'playing' | 'backlog' | 'wishlist') => void;
};

const STATUS_OPTIONS = [
  { id: 'played', label: 'Played' },
  { id: 'playing', label: 'Playing' },
  { id: 'backlog', label: 'Backlog' },
  { id: 'wishlist', label: 'Wishlist' },
];

export function GameStatusSelector({ currentStatus, onStatusChange }: StatusSelectorProps) {
  
  return (
    <View style={styles.container}>
      {STATUS_OPTIONS.map((option) => {
        const isActive = currentStatus === option.id;
        
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => onStatusChange(option.id)}
            style={[styles.button, isActive && styles.activeButton]}
          >
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    flex: 1, 
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#E91E63', 
  },
  label: {
    color: '#9E9E9E', 
    fontWeight: '600',
    marginTop: 4,
  },
  activeLabel: {
    color: '#FFFFFF', 
  },
});