import "./NavBar.css"
import {Container, Navbar, Nav} from "react-bootstrap";
import {Home, MessageCircle, Plus, User} from "lucide-react";
import {Outlet} from "react-router-dom";

function NavBar() {
    return (
        <Navbar className="navbar p-3" collapseOnSelect variant="light">
                <Nav className="align-items-center flex-column flex-fill">
                    <Nav.Link className="nav-link" href="#home">
                        <Home size={20} className="me-4"/>
                        Home
                    </Nav.Link>
                    <Nav.Link className="nav-link" href="#createpost">
                        <Plus size={20} className="me-4"/>
                        Crea
                    </Nav.Link>
                    <Nav.Link className="nav-link" href="#chat">
                        <MessageCircle size={20} className="me-4"/>
                        Chat
                    </Nav.Link>
                    <Nav.Link className="nav-link" href="#profile">
                    <User size={20} className="me-4"/>
                    Profile
                </Nav.Link>
                </Nav>
        </Navbar>
    )
}
export default NavBar;