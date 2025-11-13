import AuthTextinput from "@/components/AuthTextInput";
import BackGroundImage from "@/components/BackGroundImage";
import PrimaryButton from "@/components/PrimaryButton";
import Colors from "../../constants/Colors";

import { useAuth } from "@/services/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";


export default function SignupScreen() {
  const router = useRouter()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const {signUp} = useAuth();
    async function handleSignUp() {
      if (!username || !email || !password ) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos')
        return
      }
      setLoading(true)
      try {
        await signUp({ username, email, password})
        setLoading(false)
        router.navigate('/')
      } catch (error: any) {  
        Alert.alert('Falha no login', error.massage)
      } finally {
        setLoading(true)
      }

    }

    console.log("daniuel")
    return(
        <BackGroundImage>
            <Text style={styles.title}>CRIAR CONTA</Text>

            <AuthTextinput icon="account-outline" placeholder="Username" value={username} onChangeText={setUsername}/> 
            <AuthTextinput icon="email-outline" placeholder="E-mail" value={email} onChangeText={setEmail}/>
            <AuthTextinput icon="lock-outline" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>

            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <PrimaryButton title="Login" onPress={handleSignUp} />
            )}
            
            <Link href='/' asChild>
                <Text style={styles.linkText}>
                    Já tem uma conta? <Text style={styles.highlight}>Faça Login</Text>
                </Text>
            </Link>

        </BackGroundImage>
    )
}

const styles = StyleSheet.create({
  title: { 
    fontSize: 40,
    color: Colors.primary,
    marginBottom: 10
  },
  linkText: {
    color: Colors.secondary,
    fontSize: 15,
    textAlign: 'center',
  },
  highlight: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});