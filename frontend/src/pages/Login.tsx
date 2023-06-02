import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from '../model';
import "../App.css";


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

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
    
  //   axios.post("https://rank-kings-be.onrender.com/users/login", {
  //     username : username,
  //     password : password
  //    } )
  //   .then((response) => {
  //     console.log("response data is ", response.data)
  //     onLoginSuccessful(response.data)
  //     navigate('/dashboard')
  //   }, (error) => {
  //     console.log(error);
  //     alert("Incorrect Credentials! Please try again.")
  //   });
  // };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  // axios.post('https://rank-kings-be.onrender.com/users/login', {
  //       username : username,
  //       password : password
  //     })
  //     .then((response) => {
  //       console.log("response data is ", response.data)
  //       onLoginSuccessful(response.data)
  //       navigate('/dashboard')
  //     }, (error) => {
  //       console.log(error);
  //       alert("Incorrect Credentials! Please try again.")
  //     });
  // };

   fetch('https://rank-kings-be.onrender.com/users/login', {
    method: 'POST',
    body: JSON.stringify({
      username : username,
      password : password
    })
  })
  .then(async (response) => {
    console.log("response data is ", response.json())
    onLoginSuccessful(await response.json())
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
            <Link to="/registration">Sign Up Here!</Link>
            </form>
      </div>
    </div>
  );
};

export default Login;
