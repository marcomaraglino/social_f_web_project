import React, {useEffect} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'

const PrivateRoute = ({ user }) => {

    const location = useLocation();
    useEffect(() => {
        if(!user) {
            alert("Dev'essere autenticato per accedere a questa pagina");
        }
    }, [user, location]);
    return user ? <Outlet /> : <Navigate to="/signin" replace />
}
export default PrivateRoute;