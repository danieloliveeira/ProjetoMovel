import { useRouter } from "expo-router";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import GameCover from "./GameCover";


type Game = {
    id: string;
    title: string;
    year: number;
    imgUrl: string;
    shortDescription: string;
}

type GameGirdProps = {
    games: Game[]
    onPress?: () => void
}
export const GameGrid: React.FC<GameGirdProps> = ({games}) => {
    const screenWidth = Dimensions.get('window').width;
    const NUM_COLUMNS = 3;
    const ITEM_MARGIN = 8;
    const ITEM_WIDTH = (screenWidth - (ITEM_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;
    const router = useRouter()


   
    const handleGamePress = (gameId: string) => {

        router.push({
            pathname: "/game/[id]",
            params: {id: gameId}
        })
         
    }
    const renderGame = ({ item }: { item: Game }) => {
        return (
            <View style={{ margin: ITEM_MARGIN / 2 }}> 
                <GameCover
                    imageUrl={item.imgUrl}
                    onPress={() => handleGamePress(item.id)}
                    style={{ width: ITEM_WIDTH }} 
                />
            </View>
        );
    };
    return (
        <FlatList
            data={games}
            renderItem={renderGame}
            keyExtractor={(item) => item.id}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />

    )
}
const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 8 / 2,
        paddingTop: 10
    }
})