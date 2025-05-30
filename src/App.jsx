import PostComponent from "./components/Post/postComponent.jsx";
import LoginComponent from "./components/Login/LoginComponent.jsx";
import Navbar from "./components/Navbar/navbarComponent.jsx";
import SignUpComponent from "./components/Login/SignUpComponent.jsx";
import './app.css'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

function App() {

  return (

      <Router>
          <Routes>
              <Route path='/signup' element={<SignUpComponent />}/>
              <Route path='/signin' element={<LoginComponent />}/>
          </Routes>
      </Router>

  )
}

export default App
