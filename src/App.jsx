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
import React, {useEffect} from "react";
import Profile from "./components/Profile/Profile.jsx";
import UserPage from "./components/Profile/UserPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

function App() {

    const [currentUser, setCurrentUser] = React.useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('accessToken'); // Lo leggiamo comunque per decidere il flusso
        try {
            if (storedUser && token) {
                setCurrentUser(JSON.parse(storedUser));
            } else {
                setCurrentUser(null);
            }
        } catch (error) {
            if (storedUser && token && error.message.toLowerCase().includes("token")) {
                //logout
                handleLogout(false);
            }
        }
    }, []);

    const handleRegister = async (credentials) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/register`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.message || `Errore registrazione: ${response.status}`);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setCurrentUser(data.user);
        } catch (error) {
            console.error("Errore API " + error);
            throw new Error(error.message || `Errore registrazione`);
        }
    }

    const handleLogin = async (credentials) => {
        const endpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/login`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // IMPORTANTE
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            console.log(data.user)

            if (!response.ok) {
                throw new Error(data?.message || `Errore autenticazione: ${response.status}`);
            }

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setCurrentUser(data.user)
        } catch (error) {
            console.error("Errore API " + error);
            throw new Error(error.message || `Errore autenticazione`);
        }
    }

    const handleLogout = async(callApi = true) => {
        if (callApi) {
            try {
                await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    credentials: "include",
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
        }
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        setCurrentUser(null);
    }
  return (
      <Router>
          <Routes>
              <Route element={<Layout onLogout={handleLogout}/>}>
                  {/* Rotte pubbliche */}
                  <Route path='/' element={<FeedPage/>}/>
                  <Route path='/signup' element={<SignUp onSubmitForm={handleRegister} />}/>
                  <Route path='/signin' element={<Login onSubmitForm={handleLogin} />}/>
                  {/* Rotte protette */}
                  <Route element={<PrivateRoute user={currentUser} />}>
                      <Route path='/profile' element={<UserPage  />}/>
                      <Route path='/create-event' element={<CreateEvent/>}/>
                  </Route>
              </Route>
          </Routes>
      </Router>
  )
}

export default App
