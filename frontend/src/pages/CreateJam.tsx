import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CreateJam: React.FC = () => {
  const [jamName, setJamName] = useState<string>('')

  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJamName(event.target.value);
  };



  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios.post("/jams", {
      title : jamName,
      todos: [],
      completedTodos: [],
      battled: [],
    })
    .then((res) => {
      // console.log("ends here")
      const newJamId = res.data._id;
      navigate(`/jam/${newJamId}`);
      // navigate(`/jam/${newJamId}`, { state: { id: newJamId } });
      // Push newly created props from here to "Jam.tsx"
    }, (error) => {
      console.log(error);
    });

  };

  return (
    <div>
      <h2>Create Jam</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Jam Name:
          <input type="text" value={jamName} onChange={handleUsernameChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateJam