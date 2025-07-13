import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {useContext, useState} from "react";
import {AuthContext} from "@/utils/AuthProvider.jsx";

    function Login(){
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
        const { login } = useContext(AuthContext);
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                setError(null);
                await login({ email, password });
                navigate('/');
            } catch (err) {
                setError(err.message);
            }
        };


         return (
             <div className='loginContainer'>
                <div className='loginBox'>
                    <h1>Social Network</h1>
                    <p>Welcome back! Sign in to your account.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                        <button type='submit'>Sign In</button>
                    </form>
                    {error && <p style={ {color: "red"}}>{error}</p>}
                    <Link to='/signup'>
                        Don't have an account <span>Sign Up</span>
                    </Link>
                </div>
             </div>
         )

    }
    export default Login;