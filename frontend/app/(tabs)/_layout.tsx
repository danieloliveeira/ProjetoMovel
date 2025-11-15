import { useAuth } from '@/services/context/AuthContext';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

export default function AppLayout() {
    const {signOut, role} = useAuth()
    return (
        <Drawer
        screenOptions={{
            drawerActiveTintColor: '#fff', 
            drawerActiveBackgroundColor: '#007bff', 
            drawerInactiveTintColor: '#ccc', 
            drawerStyle: {
            backgroundColor: '#222',
            },
            headerStyle: {
            backgroundColor: '#333', 
            },
            headerTintColor: '#fff', 
        }}>
            <Drawer.Screen 
                name="index"
                options={{
                    drawerLabel: 'Home',
                    title: 'WydenGames'                
                }}
            />
            <Drawer.Screen 
                name='games'
                options={{
                    drawerLabel: 'Games',
                    title: 'WydenGames'
                }}
            />
           
            <Drawer.Screen 
                name='account'
                options={{
                    drawerLabel: 'Account',
                    title: 'WydenGames'                
                }}
            />
            <Drawer.Screen 
                name='log'
                options={{
                    drawerLabel: '+ Log a game',
                    title: 'WydenGames'                
                }}
            />

            <Drawer.Screen 
                name="admin" 
                options={{
                    drawerLabel: 'Admin Panel',
                    title: 'Admin Panel',
                    drawerItemStyle: role === 'ADMIN' ? {} : { display: 'none' }
                }}
                redirect={role !== 'ADMIN'} 
            />
            
            <Drawer.Screen
                name='signout'
                options={{
                    drawerLabel: 'Signout',
                    title: 'WydenGames'                
                }}
                listeners={{
                    drawerItemPress: (event) => {
                        event.preventDefault();
                        signOut()
                    }
                }}
            />

        </Drawer>
       
    )
}