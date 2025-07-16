import { useEffect, useRef, useState, useContext } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '@/utils/AuthProvider';
import './Chat.css';


function Chat({ onLogout }) {
    //stato per i messaggi visualizzati in chat
    const [messages, setMessages] = useState([]);
    //stato per il messaggio attualmente scritto dall'utente
    const [input, setInput] = useState('');
    //numero totale di utenti connessi alla chat
    const [clientsTotal, setClientsTotal] = useState(0);
    //ref per scrollare automaticamente in fondo alla chat
    const messagesEndRef = useRef(null);
    //recupero utente e funzione per modificarlo dal contesto Auth
    const { user, setUser } = useContext(AuthContext);
    //ref per il socket, così da mantenerlo persistente
    const socket = useRef(null);
    //messaggi scritti mentre il socket è disconnesso
    const [messageQueue, setMessageQueue] = useState([]);
    //per evitare scroll automatici multipli all'inizio
    const [hasScrolled, setHasScrolled] = useState(false);

    //funzione per ottenere un nuovo token di accesso in caso di scadenza
    async function refreshAccessToken() {
        try {
            const response = await fetch('http://localhost:3000/api/auth/refresh-token', {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Impossibile rinnovare il token');
            }
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Refresh token fallito:', error);
            handleLogout();
            return null;
        }
    }

    //funzione per disconnettere l'utente dalla chat e dal contesto globale
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        if (socket.current) {
            socket.current.disconnect();
            socket.current.off(); // Rimuove tutti i listener
        }
        if (onLogout) onLogout(); // Callback opzionale dal componente padre
    };

    //effetto eseguito all'avvio del componente o quando cambia l'utente
    useEffect(() => {
        if (!user) return;

        let isMounted = true; // Flag per evitare memory leak
        const token = localStorage.getItem('accessToken');
        if (!token) {
            handleLogout();
            return;
        }

        //inizializzazione del socket
        socket.current = io('http://localhost:3000', {
            auth: { token },
            autoConnect: false,
        });

        //al momento della connessione, registriamo l'utente
        socket.current.on('connect', () => {
            console.log('Socket connesso');
            socket.current.emit('register', user.username);

            //inviamo eventuali messaggi in coda
            if (messageQueue.length > 0) {
                messageQueue.forEach(msg => {
                    socket.current.emit('message', { message: msg });
                });
                setMessageQueue([]);
                console.log('Messaggi in coda inviati al server');
            }
        });

        //listener per aggiornare il numero di utenti connessi
        socket.current.on('clients-total', setClientsTotal);

        //ricezione cronologia messaggi dal server
        socket.current.on('chat-history', (history) => {
            if (isMounted) setMessages(history);
        });

        //ricezione di un nuovo messaggio in tempo reale
        socket.current.on('chat-message', (data) => {
            if (!isMounted) return;
            setMessages((prev) => {
                const updated = [...prev, data];
                // Scroll automatico verso il basso per vedere l'ultimo messaggio
                setTimeout(() => {
                    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return updated;
            });
        });

        //in caso di errore di autenticazione al socket, tentiamo di rinnovare il token
        socket.current.on('connect_error', async (err) => {
            console.log('Errore connessione socket:', err.message);
            if (
                err.message === 'jwt malformed' ||
                err.message === 'Token non valido' ||
                err.message === 'Token mancante'
            ) {
                console.log('Token scaduto o non valido, provo a rinnovare...');
                const newToken = await refreshAccessToken();
                if (newToken) {
                    socket.current.auth.token = newToken;
                    socket.current.connect();
                } else {
                    console.log('Non è stato possibile rinnovare il token, eseguo logout.');
                    handleLogout();
                }
            }
        });

        //connessione del socket
        socket.current.connect();

        //cleanup all'unmount
        return () => {
            isMounted = false;
            if (socket.current) {
                socket.current.disconnect();
                socket.current.off();
            }
        };
    }, [user]);

    //effetto per scrollare automaticamente all'ultimo messaggio solo una volta
    useEffect(() => {
        if (messages.length > 0 && !hasScrolled) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            setHasScrolled(true);
        }
    }, [messages, hasScrolled]);

    //funzione per inviare un messaggio
    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        //se il socket è connesso, invia il messaggio al server
        if (socket.current && socket.current.connected) {
            socket.current.emit('message', { message: input });
            setInput('');
        } else {
            //altrimenti lo mette in coda
            setMessageQueue(prev => [...prev, input]);
            setInput('');
            console.log('Socket offline: messaggio messo in coda');
        }

        //scroll automatico verso il basso dopo invio
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    //se l'utente non è autenticato, mostriamo un messaggio di accesso negato
    if (!user) {
        return (
            <div className="chat-unauthorized">
                <h1>Accesso negato</h1>
                <p>Effettua il login per accedere alla chat.</p>
            </div>
        );
    }

    //interfaccia utente della chat
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