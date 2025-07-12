export const refreshAccessToken = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/refresh', {
            method: 'POST',
            credentials: 'include', // Necessario per inviare il cookie httpOnly
        });

        if (!response.ok) throw new Error("Failed to refresh token");

        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
    } catch (err) {
        console.error("Refresh token error:", err);
        throw err;
    }
};