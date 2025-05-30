import './Login.css'
import {Link} from "react-router-dom";

function SignUpComponent(){
    return(
        <div className='loginContainer'>
            <div className='loginBox'>
                <h1>Social Network</h1>
                <p>Create a new account to get started.</p>
                <form>
                    <input type="full name" placeholder='Full Name' required/>
                    <input type="username" placeholder='Username' required/>
                    <input type="email" placeholder='Email' required/>
                    <input type="password" placeholder='Pasword' required/>
                    <button>Sign Up</button>
                </form>
                <Link to='/signin'>
                    Already have an account <span>Sign In</span>
                </Link>

            </div>
        </div>
    )
}
export default SignUpComponent;