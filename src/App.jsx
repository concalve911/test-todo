import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducer";
import TodoList from "./components/TodoList";

const store = configureStore({ reducer: rootReducer });

export default () => (
  <Provider store={store}>
    <div>
      <TodoList />
    </div>
  </Provider>
);
