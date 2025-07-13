import React, {useContext, useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "@/utils/AuthProvider.jsx";

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            alert("Devi essere autenticato per accedere a questa pagina.");
        }
    }, [loading, user]);

    if (loading) {
        // Mostra un caricamento o nulla finché non finisce il fetch dell'utente
        return <div className="text-center mt-5">Caricamento...</div>;
    }

    // Se user è presente, mostra le route protette
    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;