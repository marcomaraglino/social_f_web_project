import { useEffect, useRef, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '@/utils/AuthProvider';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [clientsTotal, setClientsTotal] = useState(0);
    const messagesEndRef = useRef(null);
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("accessToken");
    const socket = useRef(null);

    useEffect(() => {
        if (!user || !token) return;

        socket.current = io('http://localhost:3000', {
            auth: { token },
            autoConnect: false,
        });

        socket.current.connect();

        socket.current.emit('register'); // ora non serve username, lo prende il server dal token

        socket.current.on('clients-total', setClientsTotal);
        socket.current.on('chat-history', (history) => setMessages(history));
        socket.current.on('chat-message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.current.disconnect();
            socket.current.off();
        };
    }, [user, token]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        socket.current.emit('message', { message: input });
        setInput('');
    };

    if (!user) {
        return (
            <div className="chat-unauthorized">
                <h1>Accesso negato</h1>
                <p>Effettua il login per accedere alla chat.</p>
            </div>
        );
    }

    return (
        <div className="chat-main-content">
            <div className="chat-container">
                <h2 className="chat-title">NexioChat</h2>
                <p className="chat-clients">Utenti connessi: {clientsTotal}</p>

                <div className="chat-messages">
                    <ul>
                        {messages.map((msg, idx) => (
                            <li
                                key={idx}
                                className={msg.name === user.username ? 'msg-right' : 'msg-left'}
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
                <div className='d-flex justify-content-center align-items-center px-5'>
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
        </div>
    );
}

export default Chat;