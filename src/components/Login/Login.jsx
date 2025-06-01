import '../Login/Login.css'
import {Link} from 'react-router-dom'
    function Login(){
         return (
             <div className='loginContainer'>
                <div className='loginBox'>
                    <h1>Nexio</h1>
                    <p>Welcome back! Sign in to your account.</p>
                    <form>
                        <input type="email" placeholder='Email' required/>
                        <input type="password" placeholder='Password' required/>
                        <button type='submit'>Sign In</button>
                    </form>
                    <Link to='/signup'>
                        Don't have an account <span>Sign Up</span>
                    </Link>
                </div>
             </div>
         )

    }
    export default Login;