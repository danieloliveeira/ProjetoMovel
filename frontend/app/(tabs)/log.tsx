
import GameCover from "@/components/GameCover";
import api from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";

type Game = {
    id: string;
    title: string;
    imgUrl: string;
};

export default function LogSearchScreen() {
    const router = useRouter();
    
    const [search, setSearch] = useState('');
    const [games, setGames] = useState<Game[]>([]); 
    const [filteredGames, setFilteredGames] = useState<Game[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await api.get('/games');
            setGames(response.data);
            setFilteredGames(response.data); 
        } catch (error) {
            console.log("Erro ao buscar jogos");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearch(text);
        
        if (text.trim() === '') {
            setFilteredGames(games);
        } else {
            const filtered = games.filter(game => 
                game.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredGames(filtered);
        }
    };

    const handleGamePress = (gameId: string) => {
        router.push({
            pathname: "/log/[id]",
            params: { id: gameId }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Log a Game</Text>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#8b949e" />
                <TextInput
                    style={styles.input}
                    placeholder="Search game..."
                    placeholderTextColor="#8b949e"
                    value={search}
                    onChangeText={handleSearch} 
                />
                {search.length > 0 && (
                    <Ionicons onPress={() => handleSearch('')} name="close-circle" size={20} color="#8b949e" />
                )}
            </View>
            {loading ? (
                <ActivityIndicator size="large" color='#007bff' style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredGames} 
                    keyExtractor={item => item.id.toString()}
                    numColumns={3} 
                    contentContainerStyle={{ paddingBottom: 100 }}
                    renderItem={({ item }) => (
                        <View style={styles.gridItem}> 
                            <GameCover 
                                imageUrl={item.imgUrl} 
                                onPress={() => handleGamePress(item.id)} 
                            />
                            <Text numberOfLines={1} style={styles.gameTitle}>
                                {item.title}
                            </Text>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No games found.</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22',
        padding: 15,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#21262d',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#30363d',
    },
    input: {
        flex: 1,
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    gridItem: {
        flex: 1,          
        margin: 5,        
        maxWidth: '31%',  
    },
    gameTitle: {
        color: '#8b949e',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'center',
    },
    emptyText: {
        color: '#8b949e',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16
    }
});