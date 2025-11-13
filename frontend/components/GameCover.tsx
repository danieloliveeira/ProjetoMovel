import { Image } from "expo-image";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type GameCoverProps = {
    imageUrl: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>; 
}

export default function GameCover({ imageUrl, onPress, style }: GameCoverProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <Image 
                source={{ uri: imageUrl }}
                style={styles.image}
                contentFit="cover"
                transition={200}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',       
        aspectRatio: 3 / 4,  
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: '#333',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
})