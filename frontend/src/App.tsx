import { useEffect, useState } from 'react';
import './App.css';
import { User } from './model';
// import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CreateJam from './pages/CreateJam';
import Jam from './pages/Jam'; 
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';
import NavBar from './components/NavBar';


function App () {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const res = await axios.get("https://rank-kings-be.onrender.com/users");
        const user = res.data
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, [])

  return (
    <BrowserRouter>
    <div>
      <NavBar 
        loggedInUser={loggedInUser} 
        onLogoutSuccessful={() => setLoggedInUser(null)}
        />
      <Routes>
          <Route path="/" element={<Login
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
          }}
          />}/>
          <Route path="/page_not_found" element={<NotFoundPage/>}/>
          {/* <Route path="/rankking" element={<App/>}/> */}
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser}/>}/>
          <Route path="/createJam" element={<CreateJam loggedInUser={loggedInUser}/>}/>
          <Route path="/jam/:id" element={<Jam />}/>
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/page_not_found" replace />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
