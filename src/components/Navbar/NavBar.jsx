import "./NavBar.css";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Home, MessageCircle, Plus, User } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/utils/AuthProvider.jsx";

function NavBar() {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const onLogoutSubmit = () => {
        logout();
        navigate('/');
    };

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
                            className={`d-flex align-items-center text-decoration-none nav-link ${isActive ? 'active' : ''}`}
                        >
                            <Icon className="me-3" size={30} />
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


            <div className="user-details mb-4">
                {user ? (
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center bg-light rounded p-2 shadow-sm" style={{ minWidth: '220px' }}>

                            <div className="d-flex flex-column">
                                <span className="fw-bold">{user.username}</span>
                                <span style={{ fontSize: '12px' }}>{user.email}</span>
                                <button
                                    className="btn btn-sm mt-2 custom-btn"
                                    onClick={onLogoutSubmit}
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>
                ) : (
                    <div className="d-flex align-items-center">
                        <span className="me-2">Non sei loggato</span>
                        <Link to="/signin" className="btn btn-outline-secondary btn-sm custom-btn">
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NavBar;
