
import Colors from "@/constants/colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, TextInput, TextInputProps, View } from "react-native"




type AuthTextInputProps = TextInputProps & {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']
}

const AuthTextinput: React.FC<AuthTextInputProps> = ({icon, ...otherprops }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={22} color={Colors.secondary} style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.secondary}
                {...otherprops}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.primary,
    fontSize: 16,
  },
})
export default AuthTextinput;