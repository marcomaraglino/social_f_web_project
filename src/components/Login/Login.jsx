import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react";

    function Login({onSubmitForm}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitForm({email, password});
        navigate('/')
    }
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
                    {error && <p className='error'>{error.message}</p>}
                    <Link to='/signup'>
                        Don't have an account <span>Sign Up</span>
                    </Link>
                </div>
             </div>
         )

    }
    export default Login;