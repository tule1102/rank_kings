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

  // useEffect(() => {
	// 	async function fetchLoggedInUser() {
	// 		try {
  //       console.log("before the useEffect")
	// 			const res = await axios.get("/users");
  //       console.log("res is ", res);
  //       const user = res.data
  //       console.log("user is ", user)
	// 			setLoggedInUser(user.data);
  //       console.log("user is set to ", loggedInUser)
	// 		} catch (error) {
  //       console.log("No logged in Users App.tsx", loggedInUser)
	// 			console.error(error);
	// 		}
	// 	}
	// 	fetchLoggedInUser();
	// }, [])

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
  
  // useEffect(() => {
  //    const fetchLoggedInUser = () => {
  //     axios
  //       .get("http://localhost:4000/users")
  //       .then(async (res) => {
  //         const user = await res.data;
  //         setLoggedInUser(user.data);
  //         console.log("App.tsx Front End: ", loggedInUser);
  //       })
  //       .catch((error) => {
  //         console.log("No logged in Users App.tsx", loggedInUser);
  //         console.error(error);
  //       });
  //   };
  //   fetchLoggedInUser();
  // }, []);

  useEffect(() => {
    async function fetchLoggedInUser() {
      if (loggedInUser) {
        try {
          const response = await axios.get("/users");
          const user = response.data;
          setLoggedInUser(user);
          console.log("App.tsx loggedInUser" , user)
        } catch (error) {
          console.error(error);
        }
      }

    }
    fetchLoggedInUser();
  }, []);
  
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
          <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} />}/>
          <Route path="/createJam" element={<CreateJam 
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
          }}/>}/>
          <Route path="/jam/:id" element={<Jam />}/>
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/page_not_found" replace />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
