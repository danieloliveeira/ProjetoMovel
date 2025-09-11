import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";


interface AuthContextData {
    token: string | null;
    isLoading: boolean
    signIn(credentials: LoginRequestDTO): Promise<void>;
    signUp(userData: UserCreateDTO): Promise<void>;
    signOut(): void;
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedToken = await SecureStore.getItemAsync('authToken');
            if (storagedToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
                setToken(storagedToken)
            }
            setIsLoading(false)
        }
        loadStoragedData();
    }, []);

    const signIn = async ({ email, password}: LoginRequestDTO) => {
        try {
            const response = await api.post('/users/login', {email, password});
            const { token: responseToken } = response.data;
            console.log('resposta', response)
            setToken(responseToken);    

            api.defaults.headers.common['Authorization'] = `Bearer ${responseToken}`;



            await SecureStore.setItemAsync('authToken', responseToken);
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
        await SecureStore.deleteItemAsync('authToken');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, isLoading, signIn, signUp, signOut }} >
            { children }
        </AuthContext.Provider>
    );
};


export function useAuth() {
    const context = useContext(AuthContext);
    return context
}

