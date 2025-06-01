import Post from "./components/Post/Post.jsx";
import Login from "./components/Login/Login.jsx";
import Navbar from "./components/Navbar/NavBar.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import './app.css'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Layout from "./views/Layout.jsx";
import CreateEvent from "./views/CreateEvent/CreateEvent.jsx";
import {EventCard} from "./components/EventCard/EventCard.jsx";
import {FeedPage} from "./views/FeedPage/FeedPage.jsx";

function App() {

  return (
      <FeedPage></FeedPage>,
      <Router>
          <Routes>
              <Route element={<Layout/>}>
                   <Route path='/' element={<CreateEvent/>}/>
                   <Route path='home' element={<FeedPage/>}/>
                   <Route path='/signup' element={<SignUp />}/>
                  <Route path='/signin' element={<Login />}/>

              </Route>
          </Routes>
      </Router>
  )
}

export default App
