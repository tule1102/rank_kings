import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../model';

interface LoginProps {
  onLoginSuccessful: (user: User) => void,
}

const Login: React.FC<LoginProps> = ({onLoginSuccessful}) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <Link to="/registration">Register</Link>
      </form>
    </div>
  );
};

export default Login;
