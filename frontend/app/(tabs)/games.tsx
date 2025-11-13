
import { GameGrid } from "@/components/GameGrid";
import api from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";


    
export default function gamesPage() {
    const [gameData, setGameData] = useState([])
    const router = useRouter()
    useEffect(() => {
       const fetchGames = async () => {
            try {
                const response = await api.get('/games')

                setGameData(response.data)
                console.log(response.data);
            } catch (error) {
                console.log('Falha ao buscar jogos')
            }
       }

       fetchGames()
    }, [])
    return(
        <View style={{flex: 1, backgroundColor: '#161b22'}}>
            <GameGrid games={gameData} />
        </View>
    )
}