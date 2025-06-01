import Navbar from '../components/NavBar/NavBar.jsx';
import {Outlet} from "react-router-dom";
function Layout() {
    return (
        <>
            <div className='d-flex flex-column'>
                <Navbar/>
                <div className="main-content flex-fill">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default Layout;