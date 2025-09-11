import Colors from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PrimaryButtonProps = {
    title: string;
    onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
    width: '100%',
    backgroundColor: Colors.buttonPrimary,
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})

export default PrimaryButton;