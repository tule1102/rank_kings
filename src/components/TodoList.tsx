import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  completedTodos: Array<Todo>;
  setBattled: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  battled: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  battled,
  setBattled
}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Preliminaries</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
          >
            <span className="todos__heading">Placed</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="Battled">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "battled"
            }`}
          >
            <span className="todos__heading">Battled</span>
            {battled?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={battled}
                todo={todo}
                key={todo.id}
                setTodos={setBattled}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;