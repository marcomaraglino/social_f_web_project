import "./NavBar.css"
import {Container, Navbar, Nav} from "react-bootstrap";
import {Home, MessageCircle, Plus, User} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import {Outlet} from "react-router-dom";

function NavBar() {

    const location = useLocation();
    const menuItems = [
        { icon: Home, label: 'Events', path: '/' },
        { icon: Plus, label: 'Create', path: '/create-event' },
        { icon: MessageCircle, label: 'Chats', path: '/chats' },
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
                                className={`d-flex align-items-center text-decoration-none nav-link ${
                                    isActive ? 'active' : ''
                                }`}
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
        </div>
    )
}
export default NavBar;