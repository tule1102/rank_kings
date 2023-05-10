import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './model';
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'


const App: React.FC = () => {

  const [todo, setTodo] = useState<string>(""); 
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [battled, setBattled] = useState<Todo[]>([]);

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

      if (completedTodos.length === 9) {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Rank Kings</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          battled={battled}
          setBattled={setBattled}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
