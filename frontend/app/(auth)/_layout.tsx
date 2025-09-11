import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from 'react';



export default function AuthLayout() {
    return(
        <>
            <StatusBar style="light" />
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="signup" options={{headerShown: false}} />
            </Stack>
            
        </>
    )
}