import Navbar from '../components/NavBar/NavBar.jsx';
import {Outlet} from "react-router-dom";
function Layout() {
    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}
export default Layout;