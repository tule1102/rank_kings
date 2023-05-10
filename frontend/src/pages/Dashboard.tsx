import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SingleJam from '../components/SingleJam';
import { Jam } from '../model';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userJam, setUserJam] = useState<Jam[]>([])

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    
    axios.post("/users/logout")
    .then(() => {
      navigate('/login')
    }, (error) => {
      console.log(error);
    });
  }

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
        navigate('/login');
      });

  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is your dashboard. You can view your profile, settings, and more here.</p>
      <ul>
        <li><Link to="/createJam">createJam</Link></li>
        <button onClick={handleLogout}>Logout</button>
        <h2>Prelim list</h2>

        {userJam?.map((jamData) => (
         <li>
           <SingleJam
            title={jamData.title}
            jamKey={jamData._id}
            />
         </li> 
        ))

        }
      </ul>
    </div>
  );
};

export default Dashboard;
