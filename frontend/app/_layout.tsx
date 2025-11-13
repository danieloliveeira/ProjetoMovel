import { AuthProvider } from "@/services/context/AuthContext";
import { Stack } from "expo-router";
import React from 'react';

const  RootLayoutNav = () => {

  return (
      <Stack >
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="game/[id]" options={{headerShown: true, title: 'WydenGames', headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#333' 
        
        }}} />
        <Stack.Screen name="log/[id]" options={{headerShown: true, title: 'WydenGames', headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#333' 
        
        }}} />
        <Stack.Screen name="account/edit" options={{headerShown: false, title: 'WydenGames', headerTintColor: '#fff', headerStyle: {
          backgroundColor: '#333' 
        
        }}} />
      </Stack>
  )
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  )
}
