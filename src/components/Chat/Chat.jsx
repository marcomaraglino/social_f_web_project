import { useEffect, useRef, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '@/utils/AuthProvider';
import { refreshAccessToken } from '@/utils/RefreshToken';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [clientsTotal, setClientsTotal] = useState(0);
    const messagesEndRef = useRef(null);
    const { user, logout } = useContext(AuthContext);
    const socket = useRef(null);
    const [messageQueue, setMessageQueue] = useState([]);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        if (!user) return;

        let isMounted = true;
        const token = localStorage.getItem('accessToken');
        if (!token) {
            logout(false);
            return;
        }

        socket.current = io(import.meta.env.VITE_API_BACK_END_URL || 'http://localhost:3000', {
            auth: { token },
            transports: ['websocket'],
            autoConnect: false,
        });

        socket.current.on('connect', () => {
            console.log('Socket connesso');
            socket.current.emit('register', user.username);

            if (messageQueue.length > 0) {
                messageQueue.forEach(msg => {
                    socket.current.emit('message', { message: msg });
                });
                setMessageQueue([]);
                console.log('Messaggi in coda inviati al server');
            }
        });

        socket.current.on('clients-total', setClientsTotal);

        socket.current.on('chat-history', (history) => {
            if (isMounted) setMessages(history);
        });

        socket.current.on('chat-message', (data) => {
            if (!isMounted) return;
            setMessages((prev) => {
                const updated = [...prev, data];
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return updated;
            });
        });

        socket.current.on('connect_error', async (err) => {
            console.log('Errore connessione socket:', err.message);
            if (
                err.message === 'jwt malformed' ||
                err.message === 'Token non valido' ||
                err.message === 'Token mancante'
            ) {
                console.log('Token scaduto o non valido, provo a rinnovare...');
                try {
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        socket.current.auth.token = newToken;
                        socket.current.connect();
                    } else {
                        console.log('Non è stato possibile rinnovare il token, eseguo logout.');
                        logout(false);
                    }
                } catch (error) {
                    console.error("Errore nel refresh token", error);
                    logout(false);
                }
            }
        });

        socket.current.connect();

        return () => {
            isMounted = false;
            if (socket.current) {
                socket.current.disconnect();
                socket.current.off();
            }
        };
    }, [user]);

    useEffect(() => {
        if (messages.length > 0 && !hasScrolled) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            setHasScrolled(true);
        }
    }, [messages, hasScrolled]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (socket.current && socket.current.connected) {
            socket.current.emit('message', { message: input });
            setInput('');
        } else {
            setMessageQueue(prev => [...prev, input]);
            setInput('');
            console.log('Socket offline: messaggio messo in coda');
        }

        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
                                autoComplete="off"
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