import React, {useContext, useEffect} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {AuthContext} from "@/utils/AuthProvider.jsx";

const PrivateRoute = () => {

    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    useEffect(() => {
        if(!user) {
            alert("Dev'essere autenticato per accedere a questa pagina");
        }
    }, [user, location]);
    return user ? <Outlet /> : <Navigate to="/signin" replace />
}
export default PrivateRoute;