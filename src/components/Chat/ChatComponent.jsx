import React, {useContext} from 'react';
import { AuthContext } from '@/utils/AuthProvider.jsx';

function ChatPage() {
    const { user } = useContext(AuthContext); //prende username dall'AuthContext

    if (!user?.username) {
        return <div>Loading or please login to access chat...</div>; //se non ci sono username, mostra loading
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                src={`http://localhost:4000?username=${user.username}`}
                title="Chat"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    ); //restituisce iframe con la chat
}

export default ChatPage;
