import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../actions/todoSlice";

export default () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!inputValue.trim()) {
      setError("Task cannot be empty");
    } else {
      setError("");
      dispatch(addTodo(inputValue));
      setInputValue("");
    }
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="todo">
      <h1 className="todo__title">TODO List</h1>
      <input
        className="todo__input"
        placeholder="Add a new task"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="todo__button" onClick={handleAddTask}>
        Add
      </button>
      {error && <div>{error}</div>}
      <ul className="todo__list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo__item">
            {todo.text}
            <button
              className="todo__remove-button"
              onClick={() => handleRemoveTask(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
