// import React, { useState, FormEvent, ChangeEvent } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import "../App.css"
// import { Button } from 'react-bootstrap';

// const Registration: React.FC = () => {
//   const [username, setUsername] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [firstName, setFirstName] = useState<string>('');
//   const [lastName, setLastName] = useState<string>('');

//   const navigate = useNavigate();

//   const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };

//   const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setFirstName(event.target.value);
//   };

//   const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setLastName(event.target.value);
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//      //axios

//      axios.post("/users/signup", {
//       username : username,
//       email: email,
//       password: password,
//       firstName: firstName,
//       lastName: lastName
//      })
//     .then((response) => {
//       navigate('/')
//     }, (error) => {
//       console.log(error);
//     });
    
//   };

//   return (
//     <div className='App App-text'>
//       <h2>Registration</h2>
//       <form onSubmit={handleSubmit} className='form-box'>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={handleUsernameChange} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="email" value={email} onChange={handleEmailChange} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={handlePasswordChange} />
//         </label>
//         <br />
//         <label>
//           First Name:
//           <input type="firstName" value={firstName} onChange={handleFirstNameChange} />
//         </label>
//         <br />
//         <label>
//           Last Name:
//           <input type="lastName" value={lastName} onChange={handleLastNameChange} />
//         </label>
//         <br />
//         <Button className='info' type="submit">Submit</Button>
//         <Link to="/">Back to Login</Link>
//       </form>
//     </div>
//   );
// };

// export default Registration;

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import '../App.css';

const Registration: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

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

  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // axios

    axios
      .post('/users/signup', {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .then(
        (response) => {
          navigate('/');
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="App App-text">
      <h2>Registration</h2>
      <Form onSubmit={handleSubmit} className="form-box">
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} />
        </Form.Group>

        <Form.Group controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" value={firstName} onChange={handleFirstNameChange} />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" value={lastName} onChange={handleLastNameChange} />
        </Form.Group>

        <Button className="info" type="submit">
          Submit
        </Button>
        <Link to="/">Back to Login</Link>
      </Form>
    </div>
  );
};

export default Registration;
