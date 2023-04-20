import React from "react";
import TodoList from "./Components/TodoList";

const App: React.FC = () => {
  const todos = [{ id: "ti", text: "finish the course" }];
  return (
    <>
      <TodoList items={todos} />
      <div>Hello..!!</div>;
    </>
  );
};

export default App;
