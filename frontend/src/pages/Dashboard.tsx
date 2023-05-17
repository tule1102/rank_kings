import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SingleJam from '../components/SingleJam';
import { Jam } from '../model';

// interface props {
//   loggedInUser: User | null 
// }

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userJam, setUserJam] = useState<Jam[]>([])

  // const handleLogout = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault()
    
  //   axios.post("/users/logout")
  //   .then(() => {
  //     navigate('/login')
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }

  useEffect (() => {
    axios.get("/jams")
    .then((e) => {
      setUserJam(e.data)
    })
  }, [isAuthenticated])

  useEffect(() => {
      axios.get("/users")
        .then(() => {
          setIsAuthenticated(true);
        }, (error) => {
          navigate('/');
        });
  }, [navigate]);

  

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handleDelete = (jamId: string) => {
    axios.delete(`/jams/${jamId}`)
    .then(() => {
      // remove the deleted jam from the state
      setUserJam(prevState => prevState.filter(jam => jam._id !== jamId));
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <h1>Welcome to the Dashboard!</h1>
      <p>This is your dashboard. You can view your profile, settings, and more here.</p>
      <ul>
        <li><Link to="/createJam">Create a new Jam</Link></li>
        
        <h2>Prelim list</h2>

        {userJam?.map((jamData) => (
         <li>
           <SingleJam
            title={jamData.title}
            jamKey={jamData._id}
            />
            <button onClick={() => handleDelete(jamData._id)}>Delete</button>
         </li> 
        ))

        }
      </ul>
    </div>
  );
};

export default Dashboard;
