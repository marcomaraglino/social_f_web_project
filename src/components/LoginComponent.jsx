    function LoginComponent(){
         return (
             <div className='loginContainer'>
                <div className='loginBox'>
                    <h1>Social Network</h1>
                    <p>Welcome back! Sign in to your account.</p>
                    <form>
                        <input type="email" placeholder='Email' required/>
                        <input type="password" placeholder='Password' required/>
                        <button type='submit'>Sign In</button>
                    </form>
                    <a href="#" className='signup-link'>
                        Don't have an account? <span>Sign Up</span>
                    </a>
                </div>
             </div>
         )

    }
    export default LoginComponent;