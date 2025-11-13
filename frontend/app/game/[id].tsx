import api from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type GameDetails = {
    id: number;
    title: string;
    year: number;
    imgUrl: string;
    shortDescription: string;
    longDescription: string;
    score: number;
};

type GameLog = {
    id: number;
    gameId: number;
    status: 'PLAYED' | 'PLAYING' | 'BACKLOG' | 'WISHLIST';
    rating: number | null;
};


const STATUS_COLORS = {
    PLAYED: '#28a745',   
    PLAYING: '#007bff',  
    BACKLOG: '#fd7e14',  
    WISHLIST: '#6f42c1', 
    DEFAULT: '#2a2e35'   
};

export default function GameDetailsScreen() {
    const { id } = useLocalSearchParams();
    const [game, setGame] = useState<GameDetails | null>(null);
    const [currentLog, setCurrentLog] = useState<GameLog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGameAndStatus();
    }, [id]);

    const fetchGameAndStatus = async () => {
        try {
            setLoading(true);
            const [gameRes, logsRes] = await Promise.all([
                api.get(`/games/${id}`),
                api.get('/gamelogs/my-logs')
            ]);

            setGame(gameRes.data);

            const foundLog = logsRes.data.find((log: GameLog) => log.gameId === Number(id));
            
            if (foundLog) {
                setCurrentLog(foundLog);
            } else {
                setCurrentLog(null);
            }

        } catch (error) {
            console.error("Erro ao carregar jogo", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus: 'PLAYED' | 'PLAYING' | 'BACKLOG' | 'WISHLIST') => {
        const previousLog = currentLog;
        setCurrentLog(prev => ({ ...prev, status: newStatus } as GameLog));

        try {
            const response = await api.post('/gamelogs', {
                gameId: Number(id),
                status: newStatus
            });
            setCurrentLog(response.data);
        } catch (error) {
            setCurrentLog(previousLog);
            Alert.alert("Erro", "Falha ao atualizar status.");
        }
    };

    const StatusButton = ({ status, icon, label }: { status: string, icon: string, label: string }) => {
        const isActive = currentLog?.status === status;
        const activeColor = STATUS_COLORS[status as keyof typeof STATUS_COLORS];

        return (
            <TouchableOpacity 
                style={[
                    styles.statusButton, 
                    isActive ? { backgroundColor: activeColor, borderColor: activeColor } : {}
                ]}
                onPress={() => handleStatusUpdate(status as any)}
            >
                <Ionicons 
                    name={icon as any} 
                    size={24} 
                    color={isActive ? "#fff" : "#8b949e"} 
                />
                <Text style={[styles.statusLabel, isActive && { color: '#fff' }]}>{label}</Text>
            </TouchableOpacity>
        );
    };

    if (loading || !game) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} bounces={false} showsHorizontalScrollIndicator={false}>
            <ImageBackground 
                source={{ uri: game.imgUrl }} 
                style={styles.backdrop}
                blurRadius={5}
            >
                <LinearGradient
                    colors={['rgba(22,27,34,0.3)', '#161b22']}
                    style={styles.gradient}
                />
            </ImageBackground>

            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Image source={{ uri: game.imgUrl }} style={styles.coverImage} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.title}>{game.title}</Text>
                        <Text style={styles.subtitle}>{game.year} • Mojang (Exemplo)</Text>
                        <TouchableOpacity style={styles.editLogsBtn}>
                            <Text style={styles.editLogsText}>Edit your logs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
    
                <View style={styles.actionsRow}>
                    <StatusButton status="PLAYED" icon="game-controller" label="Played" />
                    <StatusButton status="PLAYING" icon="play" label="Playing" />
                    <StatusButton status="BACKLOG" icon="library" label="Backlog" />
                    <StatusButton status="WISHLIST" icon="gift" label="Wishlist" />
                </View>

                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons 
                            key={star}
                            name={currentLog?.rating && currentLog.rating >= star ? "star" : "star-outline"} 
                            size={32} 
                            color='#007bff'
                            style={{ marginHorizontal: 4 }}
                            onPress={() => console.log("Implementar update de rating aqui")}
                        />
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.description}>
                        {game.longDescription || game.shortDescription}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22',
    },
    backdrop: {
        width: '100%',
        height: 250,
        position: 'absolute',
        top: 0,
    },
    gradient: {
        flex: 1,
    },
    contentContainer: {
        marginTop: 140, 
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    coverImage: {
        width: 100,
        height: 140,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#333',
    },
    headerInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'flex-end', 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#8b949e',
        marginBottom: 12,
    },
    editLogsBtn: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    editLogsText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },

    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },
    statusButton: {
        backgroundColor: '#21262d', 
        width: 80,
        height: 70,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#30363d',
    },
    statusLabel: {
        color: '#8b949e',
        fontSize: 12,
        marginTop: 4,
        fontWeight: '600',
    },

    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#21262d',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#30363d',
    },

    section: {
        marginBottom: 20,
    },
    description: {
        color: '#c9d1d9',
        fontSize: 15,
        lineHeight: 22,
    }
});