import React from 'react'
import { Link } from 'react-router-dom';

interface props {
  title: string;
  jamKey: string;
}


const SingleJam: React.FC<props> = ({title, jamKey}) => {
  return (
    <>
    <p>
      <Link to={`/jam/${jamKey}`}>{title}</Link>    
    </p>
    </>
  )
}

export default SingleJam