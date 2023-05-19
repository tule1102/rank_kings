import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../model';
import "../App.css";
import Button from 'react-bootstrap/Button';


interface LoginProps {
  onLoginSuccessful: (user: User) => void,
}

const Login: React.FC<LoginProps> = ({onLoginSuccessful}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate('/registration');
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios.post("/users/login", {
      username : username,
      password : password
     })
    .then((response) => {
      console.log(response.data)
      onLoginSuccessful(response.data)
      navigate('/dashboard')
    }, (error) => {
      console.log(error);
      alert("Incorrect Credentials! Please try again.")
    });

  };

  return (
    <div className='full-screen-container'>
      <div className='login-container'>
          <h1 className='login-title'>Login</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className='input-group'>
              <label>Username</label>
                <input type="text" value={username} onChange={handleUsernameChange} />
              <label>Password</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button type="submit" className='login-button' >Submit</button>
            {/* <button className='btn-flat'><Link to="/registration">Register</Link></button> */}
            {/* <button type= "submit" className='login-button' onClick={handleOnclick}>Register</button> */}
            <Link to="/registration">Not yet signed up? Register here!</Link>
            </form>
      </div>
    </div>
  );
};

export default Login;
