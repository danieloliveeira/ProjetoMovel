import AuthTextinput from "@/components/AuthTextInput";
import BackGroundImage from "@/components/BackGroundImage";
import PrimaryButton from "@/components/PrimaryButton";
import Colors from "@/constants/colors";

import { useAuth } from "@/services/context/AuthContext";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text } from "react-native";


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const {signIn } = useAuth();

    async function handleSignIn() {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }
        setLoading(true)
        try {
            await signIn({ email, password});
        } catch (error: any){
            Alert.alert('Falha no login', error.massage);
        } finally {
            setLoading(false)
        }
    }

    return (
        <BackGroundImage>
            <Text style={styles.title}>WYDEN GAMES</Text>

            <AuthTextinput
                icon="email-outline"
                placeholder="Username"
                value={email}
                onChangeText={setEmail}
            />
            <AuthTextinput
                icon="lock-outline"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
            />
             
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
                <PrimaryButton title="Login" onPress={handleSignIn} />
            )}
            {/* <PrimaryButton title="Login" onPress={() => {}} /> */}

             <Link href='/' asChild>
                <Text style={styles.linkText}>
                    Esqueceu sua sua senha?
                </Text>
            </Link>
            <Link href="/signup" asChild>
                <Text style={styles.linkText}>
                    Não tem uma conta? <Text style={styles.highlight}>Cadastre-se</Text>
                </Text>
            </Link>
        </BackGroundImage>
    )
}

const styles = StyleSheet.create({
  title: { 
    fontSize: 40,
    color: Colors.primary,
    marginBottom: 20
  },
  linkText: {
    color: Colors.secondary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  highlight: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});