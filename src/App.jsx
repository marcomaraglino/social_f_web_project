import Post from "./components/Post/Post.jsx";
import Login from "./components/Login/Login.jsx";
import Navbar from "./components/Navbar/NavBar.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import './app.css'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Layout from "./views/Layout.jsx";

function App() {

  return (

      <Router>
          <Routes>
              <Route element={<Layout/>}>
                  <Route path='/signup' element={<SignUp />}/>
                  <Route path='/signin' element={<Login />}/>
              </Route>
          </Routes>
      </Router>

  )
}

export default App
