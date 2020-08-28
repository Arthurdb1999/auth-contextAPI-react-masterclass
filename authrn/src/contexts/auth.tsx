import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import * as auth from '../services/auth'

import api from '../services/api'

interface User {
    name: string;
    email: string
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        AsyncStorage.multiGet(['@RNAuth:user', '@RNAuth:token']).then(([[, user], [, token]]) => {
            const storagedUser = user
            const storagedToken = token

            if (storagedToken && storagedUser) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`

                setUser(JSON.parse(storagedUser))
                setLoading(false)
            }
        })
    }, [])

    async function signIn() {
        auth.signIn().then(({ token, user }) => {
            setUser(user)

            api.defaults.headers['Authorization'] = `Bearer ${token}`
            
            AsyncStorage.multiSet([['@RNAuth:user', JSON.stringify(user)], ['@RNAuth:token', token]])
        })
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null)
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }} >
            {/* Boolean(user) ou entao !!user */}
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
};