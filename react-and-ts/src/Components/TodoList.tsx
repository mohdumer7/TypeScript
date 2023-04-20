import React from "react";

interface TodoListProps {
  items: { id: string; text: string }[];
  removeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <span>
          <li key={todo.id}>
            {todo.text}
            <button onClick={props.removeTodo.bind(null, todo.id)}>
              DELETE
            </button>
          </li>
        </span>
      ))}
    </ul>
  );
};

export default TodoList;
