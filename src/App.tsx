import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
// import { constants } from 'buffer';


const App: React.FC = () => {

  const [todo, setTodo] = useState<string>(""); 
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination ) {
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


      if (source.droppableId === "TodoList") {
        console.log("Source Logic")
        add = active[source.index];
        active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
  
      // Destination Logic
      if (destination.droppableId === "TodoList") {
        console.log("Destination Logic")
        active.splice(destination.index, 0, add);
      } else {
        complete.splice(destination.index, 0, add);
      }

      if (completedTodos.length === 9) {
        let removed = completedTodos.pop(); // remove last element from completedTodos
        if (removed) { // check if removed is defined
          console.log("active: ", active)
          let newTodos = [removed, ...active]; // add removed element to the start of the newTodos array
          setTodos(newTodos); // update todos state
          setCompletedTodos([...completedTodos]); // update completedTodos state
          
        }
      } else {
        setCompletedTodos(complete);
        setTodos(active);
      }
  
      
    // }
        
    
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
