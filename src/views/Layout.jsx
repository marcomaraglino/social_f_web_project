import Navbar from 'src/components/NavBar/NavBar.jsx';
import {Outlet} from "react-router-dom";
import BottomBar from "src/components/Navbar/BottomBar.jsx";
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