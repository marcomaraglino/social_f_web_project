import React, { useEffect } from 'react';
import socket from './socket';

function ChatPage({ username }) {
    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
        if (username) {
            socket.emit('register', username);
        }
        return () => {
            socket.disconnect();
        };
    }, [username]);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                src="http://localhost:4000"
                title="Chat"
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
}

export default ChatPage;