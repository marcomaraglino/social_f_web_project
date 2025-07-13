import "./NavBar.css"
import {Container, Navbar, Nav} from "react-bootstrap";
import {Home, MessageCircle, Plus, User} from "lucide-react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

function NavBar({onLogout}) {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const location = useLocation();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Simulating an API call to fetch user data
                // is protected by an authentication token
                const accessToken = localStorage.getItem('accessToken');
                const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/profile/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Invia l'access token
                    },
                }); // Adjust the URL as needed
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchProfileData();
    }, [])

    const onLogoutSubmit = () => {
        onLogout();
        navigate('/')
        setProfileData(null)
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
                                    
                                 } ${item.isLoginRequired && !profileData ? 'd-none' : ''}`}
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
                {profileData.username && (
                    <div className="d-flex align-items-center">
                        <span className="me-2">Ciao, {profileData.username}!</span>
                        <button className="btn btn-outline-secondary" onClick={onLogoutSubmit}>Logout</button>
                    </div>
                )}
                {!profileData.username && (
                    <div className="d-flex align-items-center">
                        <span className="me-2">Non sei loggato</span>
                        <Link to="/signin" className="btn btn-outline-secondary">Login</Link>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NavBar;