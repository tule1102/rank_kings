import React from 'react'
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../App.css"

interface props {
  title: string;
  jamKey: string;
}


const SingleJam: React.FC<props> = ({title, jamKey}) => {
  
  return (
    <>
    <ListGroup>
      <ListGroup.Item variant='secondary'>
        <Link to={`/jam/${jamKey}`}>{title}</Link>    
      </ListGroup.Item>
    </ListGroup>
    </>
  )
}

export default SingleJam