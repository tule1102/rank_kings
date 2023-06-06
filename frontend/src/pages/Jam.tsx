import React, { useEffect, useState } from 'react';
import '../App.css';
import InputField from '../components/InputField';
import { Todo } from '../model';
import TodoList from '../components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Jam: React.FC = () => {

  const [todo, setTodo] = useState<string>(""); 
  const [title, setTitle] = useState<string>(""); 
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [battled, setBattled] = useState<Todo[]>([]);
  const location = useLocation();
  const [prelimSize, setPrelimSize] = useState<number>(16); // default to 4
  const { id } = useParams<{ id: string }>();
    

    useEffect(() => {
      async function loadJams() {
        try {
            const response = await axios.get(`/jams/${id}`)
            const data = response.data;
            setTitle(data.title)
            setTodo(data.todo);
            setTodos(data.todos)
            setCompletedTodos(data.completedTodos)
            setBattled(data.battled)
            setPrelimSize(data.prelimSize)
        } catch (error) {
            console.error(error);
        } 
    }
        loadJams();
    },[id])
  
    const handleAdd = (e: React.FormEvent) => {
      e.preventDefault()
  
      if (todo) {
        setTodos([...todos, {id: Date.now(), todo, isDone: false}])
        setTodo("") 
      }
    }

    const saveJam = () => {
      try {
        axios.put("https://rank-kings-be.onrender.com/jams/updateJam", {
          todos: todos,
          completedTodos: completedTodos,
          battled: battled,
          id: id
        }).then(() => {
          alert("Competitors have been saved successfully!")
        })
      } catch (err) {
        console.error(err)
      }
;    }
  
    const onDragEnd = (result: DropResult) => {
      const { destination, source } = result;  
      if (!destination) {
        return;
      }
  
      if (destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
  
      let add;
      let active = todos;
      let complete = completedTodos;
      let finishedBattling = battled;
  
  
        if (source.droppableId === "TodoList") {
          add = active[source.index];
          active.splice(source.index, 1);
        } else if (source.droppableId === "TodosRemove") {
          add = complete[source.index];
          complete.splice(source.index, 1);
        } else {
          add = finishedBattling[source.index];
          finishedBattling.splice(source.index, 1);
        }
    
        // Destination Logic
        if (destination.droppableId === "TodoList") {
          active.splice(destination.index, 0, add);
        } else if (destination.droppableId === "TodosRemove") {
          complete.splice(destination.index, 0, add);
        } else {
          finishedBattling.splice(destination.index, 0, add);
        }
  
        if (completedTodos.length === prelimSize + 1) {
          let removed = completedTodos.pop(); // remove last element from completedTodos
          if (removed) { // check if removed is defined
            let haveBattled = [removed, ...finishedBattling]; // add removed element to the start of the newTodos array
            setBattled(haveBattled); // update todos state
            setCompletedTodos([...completedTodos]); // update completedTodos state
            setTodos(active);
            
          }
        } else {
          setCompletedTodos(complete);
          setTodos(active);
          setBattled(finishedBattling);
        }
          
      
    };
    
  return (
    <div className='jam-full-screen-container'>
      <div className='title-container'>
          <h1 className="jam-title">{title}</h1>
          <Button onClick={saveJam}>Save</Button>
      </div>
      <div>
          <DragDropContext onDragEnd={onDragEnd}>
              <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                  battled={battled}
                  setBattled={setBattled}
                  prelimSize={prelimSize}
                  />
          </DragDropContext>
      </div>

    </div>
    
  )
}

export default Jam;