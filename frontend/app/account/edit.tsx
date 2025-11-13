import api from "@/services/api";
import { useAuth } from "@/services/context/AuthContext";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function EditProfileScreen() {
    const router = useRouter();
    const { updateUserToken } = useAuth(); // Pegamos a nova função
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadCurrentData();
    }, []);

    const loadCurrentData = async () => {
        try {
            const response = await api.get('/users/profile');
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar seus dados.");
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!username || !email) {
            return Alert.alert("Atenção", "Preencha todos os campos.");
        }

        setSaving(true);
        try {
            const response = await api.put('/users/me', {
                username,
                email
            });

            const { newToken } = response.data;

            await updateUserToken(newToken);

            Alert.alert("Sucesso", "Perfil atualizado!", [
                { text: "OK", onPress: () => router.back() }
            ]);

        } catch (error: any) {
            const message = error.response?.data?.message || "Falha ao atualizar.";
            Alert.alert("Erro", message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#f06" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 28 }} /> 
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Username</Text>
                <TextInput 
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    placeholderTextColor="#666"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Enter your email"
                    placeholderTextColor="#666"
                />

                <TouchableOpacity 
                    style={[styles.saveButton, saving && { opacity: 0.7 }]} 
                    onPress={handleSave}
                    disabled={saving}
                >
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22',
        padding: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    form: {
        flex: 1,
    },
    label: {
        color: '#8b949e',
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#0d1117',
        borderWidth: 1,
        borderColor: '#30363d',
        borderRadius: 6,
        color: '#fff',
        padding: 15,
        fontSize: 16,
        marginBottom: 25,
    },
    saveButton: {
        backgroundColor: '#007bff', 
        padding: 16,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});