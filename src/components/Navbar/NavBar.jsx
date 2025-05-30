import "./NavBar.css"
import {Container, Navbar, Nav} from "react-bootstrap";
import {Home, PlusSquare, User} from "lucide-react";
import {Outlet} from "react-router-dom";

function NavBar() {
    return (
        <Navbar className="navbar" collapseOnSelect sticky="top" variant="light">
            <Container>
                <Navbar.Brand className='nomeBrand' href="#home">Social Network</Navbar.Brand>
                <Nav className="ms-auto gap-4">
                    <Nav.Link href="#home"><Home/></Nav.Link>
                    <Nav.Link href="#createpost"><PlusSquare/></Nav.Link>
                    <Nav.Link href="#profile"><User/></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}
export default NavBar;