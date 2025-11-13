import api from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

export default function HomeScreen() {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [stats, setStats] = useState({
        played: 0,
        playing: 0,
        backlog: 0,
        wishlist: 0
    });

    const loadData = async () => {
        try {
            const [userRes, logsRes] = await Promise.all([
                api.get('/users/profile'),
                api.get('/gamelogs/my-logs')
            ]);

            setUsername(userRes.data.username);
            const logs = logsRes.data;
            setStats({
                played: logs.filter((l: any) => l.status === 'PLAYED').length,
                playing: logs.filter((l: any) => l.status === 'PLAYING').length,
                backlog: logs.filter((l: any) => l.status === 'BACKLOG').length,
                wishlist: logs.filter((l: any) => l.status === 'WISHLIST').length,
            });

        } catch (error) {
            console.error("Erro ao carregar home", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color='#007bff' />
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.content}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor='#007bff' />
            }
        >
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <View style={styles.userBadge}>
                    <View style={styles.avatarPlaceholder}>
                        <Ionicons name="person" size={16} color="#fff" />
                    </View>
                    <Text style={styles.username}>{username}</Text>
                </View>
            </View>

            <View style={styles.statsSection}>
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Played</Text>
                        <Text style={styles.statNumber}>{stats.played}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Playing</Text>
                        <Text style={styles.statNumber}>{stats.playing}</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Backlog</Text>
                        <Text style={styles.statNumber}>{stats.backlog}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Wishlist</Text>
                        <Text style={styles.statNumber}>{stats.wishlist}</Text>
                    </View>
                </View>

                <Text style={styles.sectionFooter}>Profile Stats</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22', 
    },
    content: {
        padding: 20,
        paddingTop: 60, 
        alignItems: 'center', 
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    welcomeText: {
        fontSize: 22,
        color: '#8b949e', 
        marginRight: 10,
    },
    userBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#7d85be', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    statsSection: {
        width: '100%',
        maxWidth: 300,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        marginBottom: 25,
    },
    statItem: {
        alignItems: 'center',
        width: '40%', 
    },
    statLabel: {
        fontSize: 14,
        color: '#8b949e',
        marginBottom: 5,
    },
    statNumber: {
        fontSize: 36,
        fontWeight: '300', 
        color: '#fff',
    },
    sectionFooter: {
        textAlign: 'center',
        color: '#8b949e',
        fontSize: 14,
        marginTop: 10,
        opacity: 0.7
    }
});