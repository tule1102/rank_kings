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
    
    axios.post("https://rank-kings-be.onrender.com/jams", {
      title : jamName,
      todos: [],
      completedTodos: [],
      battled: [],
      prelimSize: prelimSize
    })
    .then((res) => {
      console.log("created here")
      const newJamId = res.data._id;
      navigate(`/jam/${newJamId}`);
      // navigate(`/jam/${newJamId}`, { state: { id: newJamId } });
      // Push newly created props from here to "Jam.tsx"
    }, (error) => {
      console.log("Could not create", error);
    });

  };

  return (
    <div className='full-screen-container'>
      <div className='login-container'>
      <h2 className='login-title'>Create Jam</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className='input-group'>
        <label> Jam Name </label>
          <input type="text" value={jamName} onChange={handleUsernameChange} />
        <label> Preliminary Size: Top  
          <select value={prelimSize} onChange={handlePrelimSizeChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </label>
        <button className='login-button' type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default CreateJam