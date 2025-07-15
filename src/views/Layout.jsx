import Navbar from '@/components/Navbar/NavBar';
import {Outlet} from "react-router-dom";
import BottomBar from "@/components/Navbar/BottomBar";
import {AlertProvider} from "@/utils/AlertProvider.jsx";
function Layout({onLogout}) {
    return (
        <>
            <div className='d-flex flex-column'>

                <Navbar onLogout={onLogout}/>
                <BottomBar/>

                <div className="main-content flex-fill">
                    <AlertProvider>
                    <Outlet/>
                    </AlertProvider>
                </div>
            </div>
        </>
    )
}
export default Layout;