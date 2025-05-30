import PostComponent from "./components/Post/postComponent.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import './app.css'
import Navbar from "./components/Navbar/navbarComponent.jsx";
import SignUpComponent from "./components/SignUpComponent.jsx";
function App() {

  return (
    <>
        <Navbar></Navbar>
        <LoginComponent/>
        <SignUpComponent/>
        <div></div>
    </>
  )
}

export default App
