import { createContext, useState, useEffect } from "react";
import { refreshAccessToken } from "./auth"; // <-- importa la funzione di refresh

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // loading per il bootstrap dell'utente

    // 🔁 Al primo montaggio: prova a prendere i dati profilo
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetchWithAuth(import.meta.env.VITE_API_BASE_URL + "/profile/");
                if (!res.ok) throw new Error("Failed to fetch user");

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Errore nel fetch del profilo:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // ✅ LOGIN
    const login = async (credentials) => {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Login fallito");
        }

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
    };

    // ✅ REGISTER
    const register = async (credentials) => {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || "Registrazione fallita");
        }

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
    };

    // ✅ LOGOUT
    const logout = async (callApi = true) => {
        if (callApi) {
            try {
                await fetch(import.meta.env.VITE_API_BASE_URL + "/auth/logout", {
                    method: "POST",
                    credentials: "include",
                });
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    // ✅ FETCH CON REFRESH AUTOMATICO
    const fetchWithAuth = async (url, options = {}) => {
        let token = localStorage.getItem("accessToken");
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        let response = await fetch(url, { ...options, headers });

        if (response.status === 401 || response.status === 403) {
            try {
                const newToken = await refreshAccessToken();
                if (!newToken) throw new Error("Token refresh fallito");

                const retryHeaders = {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                };

                response = await fetch(url, { ...options, headers: retryHeaders });
            } catch (err) {
                console.error("Token refresh fallito:", err);
                logout(false); // logout locale
                throw err;
            }
        }

        return response;
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, fetchWithAuth, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};