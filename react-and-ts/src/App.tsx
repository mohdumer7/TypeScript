import React, { useState } from "react";
import TodoList from "./Components/TodoList";
import NewTodo from "./Components/NewTodo";

import { Todo } from "./Todo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prevstate: Todo[]) => {
      return [...prevstate, { id: Math.random().toString(), text: text }];
    });
  };
  const removeTodo = (id: string) => {
    setTodos((prevstate: Todo[]) => {
      return prevstate.filter((todo) => todo.id !== id);
    });
  };
  return (
    <>
      <NewTodo addTodo={addTodo} />
      <TodoList items={todos} removeTodo={removeTodo} />
      <div>Hello..!!</div>;
    </>
  );
};

export default App;
