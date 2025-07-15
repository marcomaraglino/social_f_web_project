import Post from "./components/Post/Post.jsx";
import Login from "./components/Login/Login.jsx";
import Navbar from "./components/Navbar/NavBar.jsx";
import SignUp from "./components/Login/SignUp.jsx";
import './App.css'
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Layout from "./views/Layout.jsx";
import CreateEvent from "./views/CreateEvent/CreateEvent.jsx";
import {EventCard} from "./components/EventCard/EventCard.jsx";
import {FeedPage} from "./views/FeedPage/FeedPage.jsx";
import React, {useEffect} from "react";
import Profile from "./components/Profile/Profile.jsx";
import UserPage from "./components/Profile/UserPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Chat from "./components/Chat/Chat.jsx";



function App() {
  return (
      <Router>
          <Routes>
              <Route element={<Layout/>}>
                  {/* Rotte pubbliche */}
                  <Route path='/' element={<FeedPage/>}/>
                  <Route path='/signup' element={<SignUp />}/>
                  <Route path='/signin' element={<Login />}/>
                  {/* Rotte protette */}
                  <Route element={<PrivateRoute />}>
                      <Route path='/profile' element={<UserPage  />}/>
                      <Route path='/create-event' element={<CreateEvent/>}/>
                      <Route path="/chat" element={<Chat />} />
                  </Route>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
