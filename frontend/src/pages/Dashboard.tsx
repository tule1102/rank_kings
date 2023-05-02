import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    
    axios.post("/users/logout")
    .then((response) => {
      navigate('/login')
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is your dashboard. You can view your profile, settings, and more here.</p>
      <ul>
        <li><Link to="/createJam">createJam</Link></li>
        <li><Link to="/">Prelim list</Link></li>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </div>
  );
};

export default Dashboard;
