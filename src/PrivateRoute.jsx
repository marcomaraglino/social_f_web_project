import React, {useContext, useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "@/utils/AuthProvider.jsx";
import {AlertContext} from "@/utils/AlertProvider.jsx";

const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const { showAlert } = useContext(AlertContext);

    useEffect(() => {
        if (!loading && !user) {
            showAlert("Devi effettuare il login per accedere a questa pagina.", "warning");
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