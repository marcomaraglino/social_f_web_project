import { useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '@/utils/AuthProvider';
import './Chat.css';

const socket = io('http://localhost:4000', { autoConnect: false });

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [clientsTotal, setClientsTotal] = useState(0);
    const messagesEndRef = useRef(null);
    const { user } = useContext(AuthContext);
    const username = user?.username;

    useEffect(() => {
        if (!username) return;

        socket.connect();
        socket.emit('register', username);

        socket.on('clients-total', setClientsTotal);
        socket.on('chat-history', (history) => setMessages(history));
        socket.on('chat-message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect();
            socket.off();
        };
    }, [username]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        socket.emit('message', { message: input });
        setInput('');
    };

    if (!username) {
        return (
            <div className="chat-unauthorized">
                <h1>Accesso negato</h1>
                <p>Effettua il login per accedere alla chat.</p>
            </div>
        );
    }

    return (
        <div className="main-content">
        <div className="chat-container">
            <h2 className="chat-title"> NexioChat</h2>
            <p className="chat-clients">Utenti connessi: {clientsTotal}</p>

            <div className="chat-messages">
                <ul>
                    {messages.map((msg, idx) => (
                        <li
                            key={idx}
                            className={msg.name === username ? 'msg-right' : 'msg-left'}
                        >
                            <div className="bubble">
                                <p>{msg.message}</p>
                                <span className="meta">
                  {msg.name} |{' '}
                                    {new Date(msg.dateTime).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                </span>
                            </div>
                        </li>
                    ))}
                    <div ref={messagesEndRef} />
                </ul>
            </div>

            <form className="chat-form" onSubmit={sendMessage}>
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="Scrivi un messaggio..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" className="chat-send-button">
                        ➤
                    </button>
                </div>
            </form>
        </div>
        </div>

    );
}

export default Chat;