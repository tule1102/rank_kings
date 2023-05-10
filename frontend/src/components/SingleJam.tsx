import React from 'react'
import { Link, LinkProps } from 'react-router-dom';
import { Todo } from '../model';

interface props {
  title: string;
  jamKey: string;
}

// interface props {
//   title: string;
//   jamKey: string;
//   todo: string;
//   todos: Array<Todo[]>;
//   completedTodos: Array<Todo[]>;
//   battled:Array<Todo[]>;
// }



const SingleJam: React.FC<props> = ({title, jamKey}) => {
const state = { title, jamKey };

  return (
    <>
    <p>
      <Link to={`/jam/${jamKey}`}>{title}</Link>    
      {/* <Link to={{ pathname: `/jam/${jamKey}`, state }}>{title}</Link> */}
    </p>
    </>
  )
}

export default SingleJam