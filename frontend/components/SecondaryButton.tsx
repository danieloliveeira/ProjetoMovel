import Colors from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


type SecondaryButtonProps = {
    text: string;
    highlight: string;
    onPress: () => void;
}


const SecondaryButton: React.FC<SecondaryButtonProps> = ({ text, highlight, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>
                {text}
                <Text style={styles.highlight}> {highlight} </Text>
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
    color: Colors.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
})

export default SecondaryButton;