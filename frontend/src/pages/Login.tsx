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
    <div className='App App-text'>
      <div className='form-box'>
        <div className='inside-form-box'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className='App-text'>
            <label>
              <input type="text" value={username} onChange={handleUsernameChange} placeholder='Username'/>
            </label>
            <br />
            <label>
              <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password'/>
            </label>
            <br />
            <Button type="submit" variant='info' >Submit</Button>
            {/* <Button className='btn-flat'><Link to="/registration">Register</Link></Button> */}
            <Button type= "submit" className='info' onClick={handleOnclick}>Register</Button>
            </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
