import Navbar from '../components/NavBar/NavBar.jsx';
import {Outlet} from "react-router-dom";
import BottomBar from "../components/Navbar/BottomBar.jsx";
function Layout() {
    return (
        <>
            <div className='d-flex flex-column'>
                <Navbar/>
                <BottomBar/>
                <div className="main-content flex-fill">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default Layout;