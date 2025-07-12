import Navbar from '../components/NavBar/NavBar';
import {Outlet} from "react-router-dom";
import BottomBar from "../components/Navbar/BottomBar";
function Layout({onLogout}) {
    return (
        <>
            <div className='d-flex flex-column'>
                <Navbar onLogout={onLogout}/>
                <BottomBar/>
                <div className="main-content flex-fill">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}
export default Layout;