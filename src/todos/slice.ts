import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type Todo = {
  name: string;
};

export type TodosState = {
  todos: Todo[];
  inputValue: string;
  editingValue: string;
  currentlyEditedTodo: number | null;
};

const initialState: TodosState = {
  todos: [],
  inputValue: "",
  editingValue: "",
  currentlyEditedTodo: null,
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

    finishEditingTodo: (state, action: PayloadAction<number>) => {
      state.todos[action.payload].name = state.editingValue;
      state.editingValue = "";
      state.currentlyEditedTodo = null;
    },
    startEditingTodo: (state, action: PayloadAction<number>) => {
      state.currentlyEditedTodo = action.payload;
      state.editingValue = state.todos[action.payload].name;
    },

    cancelEditingTodo: (state) => {
      state.currentlyEditedTodo = null;
      state.editingValue = "";
    },
    editInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    editEditingValue: (state, action: PayloadAction<string>) => {
      state.editingValue = action.payload;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  startEditingTodo,
  finishEditingTodo,
  cancelEditingTodo,
  editInputValue,
  editEditingValue,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectInputValue = (state: RootState) => state.todos.inputValue;
export const selectEditInputValue = (state: RootState) =>
  state.todos.editingValue;
export const selectCurrentlyEditedTodo = (state: RootState) =>
  state.todos.currentlyEditedTodo;

export default todosSlice.reducer;
