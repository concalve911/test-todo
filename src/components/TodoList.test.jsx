import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TodoList from "./TodoList";

const mockStore = configureStore([]);
const initialState = { todos: [] };

const renderWithProvider = (ui, { initialState }) => {
  const store = mockStore(initialState);
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Component TodoList", () => {
  test(`Must be show your title "TODO LIST"`, () => {
    renderWithProvider(<TodoList />, { initialState });
    expect(screen.getByText(/TODO LIST/i)).toBeInTheDocument();
  });

  test("Must be show your input text", () => {
    renderWithProvider(<TodoList />, { initialState });
    const input = screen.getByPlaceholderText(/Add a new task/i);

    fireEvent.change(input, { target: { value: "New Task 1" } });
    expect(input.value).toBe("New Task 1");
  });

  test("Must be show error when you add task with empty field", () => {
    renderWithProvider(<TodoList />, { initialState });
    const button = screen.getByText(/Add/i);

    fireEvent.click(button);
    expect(screen.queryByText(/Task cannot be empty/)).toBeInTheDocument();
  });

  test("Must add new task when you press Add", () => {
    renderWithProvider(<TodoList />, { initialState });
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const button = screen.getByText(/Add/i);

    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(button);

    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("Must delete your task when you press Remove", () => {
    const populatedState = { todos: [{ id: 1, text: "Delete Task" }] };
    renderWithProvider(<TodoList />, { initialState: populatedState });

    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);

    expect(screen.queryByText("Delete Task")).not.toBeInTheDocument();
  });
});
