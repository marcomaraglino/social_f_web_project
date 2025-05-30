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
                <a href="#">
                    Already have an acocunt?<span>Sign In</span>
                </a>

            </div>
        </div>
    )
}
export default SignUpComponent;