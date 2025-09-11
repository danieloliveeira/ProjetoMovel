import { AuthProvider } from "@/services/context/AuthContext";
import { Stack } from "expo-router";
import React from 'react';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack >
        <Stack.Screen name="(auth)" options={{headerShown: false}} />

        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false}} */}
      </Stack>
    </AuthProvider>
  )
}
