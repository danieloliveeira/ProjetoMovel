import api from "@/services/api";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

type UserData = {
    id: number;
    username: string;
    email: string;
    playedCount: number;
    backlogCount: number;
    role: string;
};

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
    const [users, setUsers] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os usuários.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'list') {
            fetchUsers();
        }
    }, [activeTab]);
    
    const openPasswordModal = (user: UserData) => {
        setSelectedUser(user);
        setNewPassword(''); 
        setIsModalVisible(true);
    };
    
    const closePasswordModal = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const handlePasswordSave = async () => {
        if (!selectedUser || newPassword.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setIsSavingPassword(true);
        try {
            await api.patch(`/admin/users/${selectedUser.id}/password`, {
                newPassword: newPassword
            });
            console.log(selectedUser.id);
            Alert.alert("Sucesso", `Senha de ${selectedUser.username} atualizada.`);
            closePasswordModal();
        } catch (error) {
            Alert.alert("Erro", "Falha ao atualizar a senha.");
        } finally {
            setIsSavingPassword(false);
        }
    };

    const handleDelete = (id: number, username: string) => {
        Alert.alert(
            "Excluir Usuário",
            `Tem certeza que deseja remover ${username}? Essa ação não pode ser desfeita.`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await api.delete(`/users/${id}`);
                            Alert.alert("Sucesso", "Usuário removido.");
                            fetchUsers(); 
                            console.log('deu bom');
                        } catch (error) {
                            console.log('deu erro');
                            Alert.alert("Erro", "Falha ao excluir usuário.");
                        }
                    }
                }
            ]
        );
    };

    const handleCreate = async () => {
        if (!newName || !newEmail || !newPassword) {
            return Alert.alert("Atenção", "Preencha todos os campos.");
        }

        try {
            await api.post('/admin/users', {
                username: newName,
                email: newEmail,
                password: newPassword
            });
            Alert.alert("Sucesso", "Usuário criado com sucesso!");

            setNewName('');
            setNewEmail('');
            setNewPassword('');
            setActiveTab('list');
        } catch (error) {
            Alert.alert("Erro", "Falha ao criar usuário. Verifique se o email já existe.");
        }
    };

    const renderUserItem = ({ item }: { item: UserData }) => (
        <View style={styles.userCard}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.username}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>🎮 Played: {item.playedCount}</Text>
                    <Text style={styles.statsText}>📚 Backlog: {item.backlogCount}</Text>
                </View>
            </View>

            <TouchableOpacity 
                    onPress={() => openPasswordModal(item)}
                    style={styles.iconButton}
                >
                    <Ionicons name="key-outline" size={24} color="#e0b0ff" />
                </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    console.log("1. O toque foi detectado!");
                    console.log("2. ID:", item.id, "User:", item.username);
                    handleDelete(item.id, item.username);
                }}
                style={styles.deleteButton}
            >
                <Ionicons name="trash-outline" size={24} color="#ff4444" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>

            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'list' && styles.activeTab]} 
                    onPress={() => setActiveTab('list')}
                >
                    <Text style={styles.tabText}>User Manager</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tabButton, activeTab === 'create' && styles.activeTab]} 
                    onPress={() => setActiveTab('create')}
                >
                    <Text style={styles.tabText}>Create a New</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {activeTab === 'list' ? (
                    isLoading ? (
                        <ActivityIndicator size="large" color="#007bff" />
                    ) : (
                        <FlatList
                            data={users}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderUserItem}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            ListEmptyComponent={<Text style={styles.emptyText}>Not User Find.</Text>}
                        />
                    )
                ) : (
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>User name</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Ex: Gamer123" 
                            placeholderTextColor="#666"
                            value={newName}
                            onChangeText={setNewName}
                        />

                        <Text style={styles.label}>E-mail</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Ex: email@teste.com" 
                            placeholderTextColor="#666"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={newEmail}
                            onChangeText={setNewEmail}
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="******" 
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                            <Text style={styles.createButtonText}>Create User</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={closePasswordModal}
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalBackdrop}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Resetar Senha</Text>
                        <Text style={styles.modalSubtitle}>
                            Usuário: <Text style={{fontWeight: 'bold'}}>{selectedUser?.username}</Text>
                        </Text>

                        <Text style={styles.label}>Nova Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mínimo 6 caracteres"
                            placeholderTextColor="#666"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]} 
                                onPress={closePasswordModal}
                            >
                                <Text style={styles.createButtonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.modalButton, styles.createButton]} 
                                onPress={handlePasswordSave}
                                disabled={isSavingPassword}
                            >
                                {isSavingPassword ? 
                                    <ActivityIndicator color="#fff" /> : 
                                    <Text style={styles.createButtonText}>Salvar</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161b22', 
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e',
        padding: 10,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#007bff',
    },
    tabText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        flex: 1,
        padding: 15,
    },
    userCard: {
        backgroundColor: '#222',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#333'
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 4,
        gap: 10
    },
    statsText: {
        color: '#007bff',
        fontSize: 12,
        fontWeight: '600',
    },
    deleteButton: {
        padding: 10,
    },
    emptyText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
    formContainer: {
        marginTop: 10,
    },
    label: {
        color: '#ccc',
        marginBottom: 5,
        marginLeft: 2,
    },
    input: {
        backgroundColor: '#222',
        color: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    createButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    iconButton: {
        padding: 10,
        marginLeft: 5,
    },

    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#222',
        borderRadius: 8,
        padding: 20,
        borderWidth: 1,
        borderColor: '#333'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#ccc',
        marginBottom: 20,
    },
    modalButtonRow: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    modalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#444',
    },
    
});