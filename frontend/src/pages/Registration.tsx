import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../App.css"
import { Button } from 'react-bootstrap';

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
     //axios

     axios.post("/users/signup", {
      username : username,
      email: email,
      password: password,
     })
    .then((response) => {
      navigate('/')
    }, (error) => {
      console.log(error);
    });
    
  };

  return (
    <div className='full-screen-container'>
      <div className='login-container'>
        <h1 className='login-title'>Registration</h1>
          <form onSubmit={handleSubmit} className='form'>
            <div className='input-group'>
              <label> Username </label>
                <input type="text" value={username} onChange={handleUsernameChange} />
              <label> Email </label>
                <input type="email" value={email} onChange={handleEmailChange} />
              <label> Password </label>
                <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button className='login-button' type="submit" > Submit</button>
              <Link to="/">Back to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default Registration;


