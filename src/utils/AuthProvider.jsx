// src/contexts/AuthContext.jsx
import {createContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async (token) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profile/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Errore fetch profilo');
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.error("Errore nel fetch del profilo:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setLoading(false);
            return;
        }
        fetchProfile(token).finally(() => setLoading(false));
    }, []);

    const login = async (credentials) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Errore login');
        localStorage.setItem('accessToken', data.accessToken);
        await fetchProfile(data.accessToken); // 🔥 aggiorna il context!
    };

    const register = async (credentials) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || 'Errore registrazione');
        localStorage.setItem('accessToken', data.accessToken);
        await fetchProfile(data.accessToken); // 🔥 aggiorna il context!
    };

    const logout = async (callApi) => {
        if (callApi) {
            try {
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    credentials: "include",
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        localStorage.removeItem('accessToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};