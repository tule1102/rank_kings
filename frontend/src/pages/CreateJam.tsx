import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const CreateJam: React.FC = () => {
  const [jamName, setJamName] = useState<string>('')
  const [prelimSize, setPrelimSize] = useState<number>(16)

  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJamName(event.target.value);
  };

  const handlePrelimSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPrelimSize(Number(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios.post("/jams", {
      title : jamName,
      todos: [],
      completedTodos: [],
      battled: [],
      prelimSize: prelimSize
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
        <label>
          Preliminary Size: Top  
          <select value={prelimSize} onChange={handlePrelimSizeChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateJam