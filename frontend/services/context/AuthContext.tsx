import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";


interface AuthContextData {
    token: string | null;
    role: string | null;
    isLoading: boolean
    signIn(credentials: LoginRequestDTO): Promise<void>;
    signUp(userData: UserCreateDTO): Promise<void>;
    signOut(): void;
    updateUserToken(newToken: string): Promise<void>;
}

type LoginRequestDTO = {
    email: string;
    password: string;
};

type UserCreateDTO = {
    username: string;
    email: string;
    password: string;
};

const AuthContext = createContext<AuthContextData> ({} as AuthContextData)


export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string |  null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true);


    async function fetchUserProfile() {
        try {
            const res = await api.get('/users/profile')

            setRole(res.data.role);
            await AsyncStorage.setItem('userRole', res.data.role)
        } catch (err){
            console.log('Erro ao buscar role do usuario');
        }
    }

    useEffect(() => {
        async function loadStoragedData() {
            try {
                const storagedToken = await AsyncStorage.getItem('authToken');
                const storagedRole = await AsyncStorage.getItem('userRole')
            if (storagedToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
                setToken(storagedToken);

                if(storagedRole) {
                    setRole(storagedRole);
                }else {
                    await fetchUserProfile()
                }
            }
            } catch (e) {
                console.error("Falha ao carregar o token.", e);
            } finally {
                setIsLoading(false);
            }
        }
    loadStoragedData();
    }, []);

    const updateUserToken = async (newToken: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        await AsyncStorage.setItem('authToken', newToken);
        setToken(newToken);
    };

    const signIn = async ({ email, password}: LoginRequestDTO) => {
        try {
            const response = await api.post('/users/login', {email, password});
            const { token: responseToken } = response.data;
            console.log('resposta', response)

            setToken(responseToken);    

            api.defaults.headers.common['Authorization'] = `Bearer ${responseToken}`;

            await AsyncStorage.setItem('authToken', responseToken);

            await fetchUserProfile()
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Email ou senha inválidos.');
        }
    };

    const signUp = async ({ username, email, password }: UserCreateDTO) => {
        try {
            await api.post('http://localhost:8080/users/register', { username, email, password });
            console.log('daniel')
            console.log('Vitor')
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error('Nao foi possivel realizar o cadastro')
        }
    };

    const signOut = async () => {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('userRole');
        setToken(null);
        setRole(null);
        router.navigate('/(auth)')
    }

    return (
        <AuthContext.Provider value={{ token,role,isLoading, signIn, signUp, signOut, updateUserToken }} >
            { children }
        </AuthContext.Provider>
    );
};


export function useAuth() {
    const context = useContext(AuthContext);
    return context
}

