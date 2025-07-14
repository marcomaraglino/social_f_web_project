import "./NavBar.css"
import {Container, Navbar, Nav} from "react-bootstrap";
import {Home, MessageCircle, Plus, User} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/utils/AuthProvider.jsx";

function NavBar() {
    const {user, logout} = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();

    const onLogoutSubmit = () => {
        logout();
        navigate('/')
    }

    const menuItems = [
        { icon: Home, label: 'Events', path: '/' },
        { icon: Plus, label: 'Create', path: '/create-event' },
        { icon: MessageCircle, label: 'Chat', path: '/chat' },
        { icon: User, label: 'Profile', path: '/profile' }
    ];

    return (
        <div className="sidebar d-none d-md-flex flex-column p-4">
                <nav className="align-items-center flex-column flex-fill">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`d-flex  align-items-center text-decoration-none nav-link ${
                                    isActive ? 'active' : ''
                                    
                                 } ${item.isLoginRequired && !user ? 'd-none' : ''}`}
                            >
                                <Icon className="me-3" size={30}/>
                                {item.label}
                            </Link>
                        );
                    })}
                    {/* <Nav.Link className="nav-link" href="#home">
                        <Home size={20} className="me-4"/>
                        Home
                    </Nav.Link>
                    <Nav.Link className="nav-link" href="#createpost">
                        <PlusSquare size={20} className="me-4"/>
                        Crea
                    </Nav.Link>
                    <Nav.Link className="nav-link" href="#chat">
                        <MessageCircle size={20} className="me-4"/>
                        Chat
                    </Nav.Link>
                    <Nav.Link className="nav-link" href="#profile">
                    <User size={20} className="me-4"/>
                    Profile
                </Nav.Link>*/}
                </nav>
            <div className="user-details mt-auto">
                {/* !!!!!!! CAMBIARE VISUALIZZAZIONE UTENTE*/}
                {user && (
                    <div className="d-flex align-items-center gap-2 ps-0">
                        <span className="me-1">Ciao, {user.username}!</span>
                        <button className="btn btn-outline-secondary btn-sm" onClick={onLogoutSubmit}>Logout</button>
                    </div>
                )}
                {!user && (
                    <div className="d-flex align-items-center">
                        <span className="me-2">Non sei loggato</span>
                        <Link to="/signin" className="btn btn-outline-secondary btn-sm">Login</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NavBar;