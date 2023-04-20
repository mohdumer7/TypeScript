import React, { useRef } from "react";
import "./NewTodo.css";

type NewTodoProps = {
  addTodo: (text: string) => void;
};

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.addTodo(enteredText);
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div>
        <label htmlFor="todo-text">Todo Text</label>
        <input ref={textInputRef} type="text" id="todo-text" />
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default NewTodo;
