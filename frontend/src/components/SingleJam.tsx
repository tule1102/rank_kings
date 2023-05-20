import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../App.css"
import { Jam } from '../model';
import axios from 'axios';

interface props {
  title: string;
  jamKey: string;
}


const SingleJam: React.FC<props> = ({title, jamKey}) => {
  
  return (
    <>
    <h5>
      <Link to={`/jam/${jamKey}`}>{title}</Link>    
    </h5>
    
    </>
  )
}

export default SingleJam