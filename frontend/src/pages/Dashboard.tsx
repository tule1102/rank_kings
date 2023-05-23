import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import SingleJam from '../components/SingleJam';
import { Jam } from '../model';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';



import "../App.css"
import { Button } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userJam, setUserJam] = useState<Jam[]>([])


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
    <div className='full-screen-container'>
      <div className='login-container'>
        <h1 className='login-title'>Welcome to the Dashboard!</h1>
          <div className='dashboard-container'>
            <button className='login-button' type="submit" onClick={() => {navigate('/createJam')}}>Create Jam</button>
                <h2 className='jam-title'>Jam List</h2>
                <Stack gap={3}>

                {userJam?.map((jamData) => (
                <>
                    <SingleJam
                        title={jamData.title}
                        jamKey={jamData._id}
                        />
                      <div className="vr" />
                      <Button variant="danger" className='delete-button' 
                        onClick={() => handleDelete(jamData._id)}>
                        Delete
                      </Button>
                </>
              ))}
              </Stack> 
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
