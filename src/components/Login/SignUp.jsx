import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/utils/AuthProvider.jsx";

function SignUp() {

    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            // Se l'utente è già loggato, reindirizza alla home page
            navigate('/');
        }
    }, )

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setError(null); // reset eventuali errori precedenti
            const data = await register({ fullname, username, email, password });
            console.log("Registrazione avvenuta con successo:", data);
            navigate('/')
        } catch (error) {
            console.error("Errore durante la registrazione:", error);
            setError(error.message); // Usa error.message per visualizzarlo a schermo
        }
    };

    return(
        <div className='loginContainer'>
            <div className='loginBox'>
                <h1>Nexio</h1>
                <p>Create a new account to get started.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        required/>
                    <input
                        type="username"
                        placeholder='Username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required/>
                    <input
                        type="email"
                        placeholder='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required/>
                    <input
                        type="password"
                        placeholder='Pasword'
                        minLength={6}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required/>
                    <button>Sign Up</button>
                </form>
                {error && <p style={ {color: "red"}}>{error}</p>}

                <Link to='/signin'>
                    Already have an account <span>Sign In</span>
                </Link>

            </div>
        </div>
    )
}
export default SignUp;