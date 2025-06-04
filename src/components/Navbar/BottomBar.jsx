import {Home, MessageCircle, Plus, User} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import "./BottomBar.css"

function BottomBar() {
    const navItems = [
        { icon: Home, label: 'Events', path: '/' },
        { icon: Plus, label: 'Create', path: '/create-event' },
        { icon: MessageCircle, label: 'Chats', path: '/chats' },
        { icon: User, label: 'Profile', path: '/profile' }
    ];

    const location = useLocation();

    return (
        <div className="bottom-nav d-md-none px-4 py-2">
            <div className="d-flex justify-content-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`d-flex flex-column align-items-center text-decoration-none py-2 px-3 rounded-3  ${
                                isActive
                                ? "text-primary" : "text-muted"
                            }`}
                        >
                            <Icon size = {20} className="mb-1"/>

                        </Link>
                    )
                    }
                )}
            </div>
        </div>
    )
}
export default BottomBar;