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
      console.log("App.tsx line 22")
			try {
				const res = await axios.get("/users");
        const user = await res.data
        console.log("From App.tsx, AuthenticatedUser is ", user);
				setLoggedInUser(user.data);
			} catch (error) {
        console.log("did not work App.tsx", loggedInUser)
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, [])

  // useEffect(() => {
  //   async function fetchLoggedInUser() {
  //     console.log("App.tsx line 22")
  //     try {
  //       const res = await fetch("/users");
  //       const data = await res.json();
  //       const user = data.data;
  //       console.log("From App.tsx, AuthenticatedUser is ", user);
  //       setLoggedInUser(user);
  //     } catch (error) {
  //       console.log("did not work App.tsx", loggedInUser)
  //       console.error(error);
  //     }
  //   }
  //   fetchLoggedInUser();
  // }, []);
  

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
