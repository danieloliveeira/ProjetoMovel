import { GameGrid } from "@/components/GameGrid";
import api from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type UserProfile = {
    id: number;
    username: string;
    email: string;
    playedCount: number;
    backlogCount: number;
};

type GameLog = {
    id: number; 
    gameId: number; 
    gameTitle: string;
    gameImgUrl: string;
    status: 'PLAYED' | 'PLAYING' | 'BACKLOG' | 'WISHLIST';
    rating: number | null;
};

export default function AccountScreen() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [logs, setLogs] = useState<GameLog[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'profile' | 'games'>('profile');
    
    const [gameFilter, setGameFilter] = useState<'PLAYED' | 'PLAYING' | 'BACKLOG' | 'WISHLIST'>('PLAYED');

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    console.log(user);
    const loadData = async () => {
        try {
            setLoading(true);

            const [userRes, logsRes] = await Promise.all([
                api.get('/users/profile'),
                api.get('/gamelogs/my-logs')
            ]);

            setUser(userRes.data);
            setLogs(logsRes.data);
        } catch (error) {
            console.error("Erro ao carregar perfil", error);
        } finally {
            setLoading(false);
        }
    };
    const filteredLogs = logs.filter(log => log.status === gameFilter);

    const gamesForGrid = filteredLogs.map(log => ({
        id: log.gameId.toString(), 
        title: log.gameTitle,
        imgUrl: log.gameImgUrl,
        year: 0, 
        shortDescription: '' 
    }));

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="'#007bff'" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={40} color="#fff" />
                </View>
                <View>
                    <Text style={styles.username}>{user?.username}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => router.push('/account/edit')}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'profile' && styles.activeTab]} 
                    onPress={() => setActiveTab('profile')}
                >
                    <Ionicons name="person-circle-outline" size={20} color="#fff" />
                    <Text style={styles.tabText}>Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'games' && styles.activeTab]} 
                    onPress={() => setActiveTab('games')}
                >
                    <Ionicons name="game-controller-outline" size={20} color="#fff" />
                    <Text style={styles.tabText}>Games</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeTab === 'profile' && (
                    <View style={styles.statsSection}>
                        <Text style={styles.sectionTitle}>Estatísticas</Text>
                        
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{user?.playedCount || 0}</Text>
                                <Text style={styles.statLabel}>Jogos Zerados</Text>
                            </View>
                            
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{user?.backlogCount || 0}</Text>
                                <Text style={styles.statLabel}>No Backlog</Text>
                            </View>

                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>{logs.length}</Text>
                                <Text style={styles.statLabel}>Total Logs</Text>
                            </View>
                        </View>
                    </View>
                )}
                {activeTab === 'games' && (
                    <View style={{ flex: 1 }}>
                        <View style={styles.filterContainer}>
                            {(['PLAYED', 'PLAYING', 'BACKLOG', 'WISHLIST'] as const).map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    style={[
                                        styles.filterButton, 
                                        gameFilter === status && styles.activeFilterButton
                                    ]}
                                    onPress={() => setGameFilter(status)}
                                >
                                    <Text style={[
                                        styles.filterText,
                                        gameFilter === status && styles.activeFilterText
                                    ]}>
                                        {status.charAt(0) + status.slice(1).toLowerCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {gamesForGrid.length > 0 ? (
                            <GameGrid games={gamesForGrid} />
                        ) : (
                            <View style={styles.emptyState}>
                                <Text style={styles.emptyText}>Nenhum jogo nesta lista.</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#161b22',
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#444c56', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    editButton: {
        backgroundColor: '#373e47',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        marginTop: 5,
        alignSelf: 'flex-start',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#21262d',
        marginHorizontal: 15,
        borderRadius: 6,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 4,
        gap: 6,
    },
    activeTab: {
        backgroundColor: '#373e47', 
    },
    tabText: {
        color: '#c9d1d9',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 15,
    },
    statsSection: {
        marginTop: 10,
    },
    sectionTitle: {
        color: '#8b949e',
        marginBottom: 15,
        fontSize: 16,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    statLabel: {
        fontSize: 12,
        color: '#8b949e',
        marginTop: 2,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-between', 
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#30363d',
        backgroundColor: 'transparent',
    },
    activeFilterButton: {
        backgroundColor: '#007bff', 
        borderColor: '#007bff',
    },
    filterText: {
        color: '#8b949e',
        fontSize: 12,
        fontWeight: '600',
    },
    activeFilterText: {
        color: '#fff',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#8b949e',
        fontSize: 16,
    }
});