import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type Todo = {
  name: string;
};

export type TodosState = {
  todos: Todo[];
  inputValue: string;
  editInputValue: string;
};

const initialState: TodosState = {
  todos: [],
  inputValue: "",
  editInputValue: "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state) => {
      state.todos.unshift({ name: state.inputValue });
      state.inputValue = "";
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos
        .slice(0, action.payload)
        .concat(state.todos.slice(action.payload + 1));
    },

    editTodo: (state, action: PayloadAction<string>) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.name === action.payload
      );
      state.todos[todoIndex].name = state.inputValue;
      state.inputValue = "";
    },
    editInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, editInputValue } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectInputValue = (state: RootState) => state.todos.inputValue;

export default todosSlice.reducer;
