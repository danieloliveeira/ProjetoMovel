import api from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const COLORS = {
    PLAYED: '#28a745',
    PLAYING: '#007bff',
    BACKLOG: '#fd7e14',
    WISHLIST: '#6f42c1',
    INACTIVE: '#21262d'
};

export default function LogFormScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    
    const [game, setGame] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        loadGameAndLog();
    }, [id]);

    const loadGameAndLog = async () => {
        try {
            setLoading(true);
            const [gameRes, logsRes] = await Promise.all([
                api.get(`/games/${id}`),
                api.get('/gamelogs/my-logs')
            ]);
            setGame(gameRes.data);

            const existingLog = logsRes.data.find((l: any) => l.gameId === Number(id));
            if (existingLog) {
                setStatus(existingLog.status);
                setRating(existingLog.rating || 0);
            }
        } catch (error) {
            console.log("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!status) {
            return Alert.alert("Atenção", "Selecione um status para o jogo.");
        }

        try {
            await api.post('/gamelogs', {
                gameId: Number(id),
                status: status,
                rating: rating
            });
            
            Alert.alert("Sucesso", "Log salvo!", [
                { text: "OK", onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar o log.");
        }
    };

    if (loading) return (
        <View style={[styles.container, {justifyContent: 'center'}]}>
            <ActivityIndicator size="large" color='#007bff'/>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image source={{ uri: game?.imgUrl }} style={styles.cover} />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                        <Text style={styles.title}>{game?.title}</Text>
                        <Text style={styles.year}>{game?.year}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionLabel}>Status</Text>
                <View style={styles.statusRow}>
                    {['PLAYED', 'PLAYING', 'BACKLOG', 'WISHLIST'].map((s) => (
                        <TouchableOpacity
                            key={s}
                            style={[
                                styles.statusBtn, 
                                status === s ? { backgroundColor: COLORS[s as keyof typeof COLORS], borderColor: COLORS[s as keyof typeof COLORS] } : {}
                            ]}
                            onPress={() => setStatus(s)}
                        >
                            <Text style={[styles.statusText, status === s && { color: '#fff' }]}>
                                {s.charAt(0) + s.slice(1).toLowerCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionLabel}>Rating</Text>
                <View style={styles.ratingRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity key={star} onPress={() => setRating(star)}>
                            <Ionicons 
                                name={rating >= star ? "star" : "star-outline"} 
                                size={40} 
                                color={rating >= star ? '#007bff' : "#444"} 
                            />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                    <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.btnText}>Save Log</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22',
    },
    scrollContent: { 
        padding: 20, 
        paddingBottom: 100 
    },
    header: { 
        flexDirection: 'row', 
        marginBottom: 30, 
        alignItems: 'center',
        marginTop: 20
    },
    cover: { 
        width: 60, 
        height: 80, 
        borderRadius: 4 
    },
    title: { 
        color: '#fff', 
        fontSize: 20, 
        fontWeight: 'bold' 
    },
    year: { 
        color: '#888', 
        fontSize: 14 
    },
    sectionLabel: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        marginTop: 10 
    },
    statusRow: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: 10, 
        marginBottom: 25 
    },
    statusBtn: {
        paddingVertical: 10, 
        paddingHorizontal: 16,
        borderRadius: 6, 
        borderWidth: 1, 
        borderColor: '#333', 
        backgroundColor: '#21262d'
    },
    statusText: { 
        color: '#ccc', 
        fontWeight: '600', 
        fontSize: 14 
    },
    ratingRow: { 
        flexDirection: 'row', 
        gap: 15, 
        marginBottom: 20 
    },
    footer: {
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0,
        flexDirection: 'row', 
        padding: 15, 
        backgroundColor: '#161b22',
        borderTopWidth: 1, 
        borderTopColor: '#333'
    },
    cancelBtn: { 
        flex: 1, 
        padding: 15, 
        alignItems: 'center', 
        marginRight: 10, 
        borderRadius: 6, 
        backgroundColor: '#333' 
    },
    saveBtn: { 
        flex: 1, 
        padding: 15, 
        alignItems: 'center', 
        borderRadius: 6, 
        backgroundColor: '#007bff'
    },
    btnText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: 16 
    }
});