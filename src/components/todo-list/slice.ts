import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type Todo = {
  name: string;
};

export type TodosState = {
  todos: Todo[];
  inputValue: string;
  editInputValue: string;
  currentlyEditedTodo: number | null;
};

const initialState: TodosState = {
  todos: [],
  inputValue: "",
  editInputValue: "",
  currentlyEditedTodo: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    addTodo: (state) => {
      if (state.inputValue !== "") {
        state.todos.unshift({ name: state.inputValue });
        state.inputValue = "";
        cancelEditing(state);
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos
        .slice(0, action.payload)
        .concat(state.todos.slice(action.payload + 1));
      cancelEditing(state);
    },
    startEditingTodo: (state, action: PayloadAction<number>) => {
      state.currentlyEditedTodo = action.payload;
      state.editInputValue = state.todos[action.payload].name;
    },
    finishEditingTodo: (state, action: PayloadAction<number>) => {
      state.todos[action.payload].name = state.editInputValue;
      cancelEditing(state);
    },
    cancelEditingTodo: cancelEditing,
    changeEditInputValue: (state, action: PayloadAction<string>) => {
      state.editInputValue = action.payload;
    },
  },
});

function cancelEditing(state: TodosState) {
  state.currentlyEditedTodo = null;
  state.editInputValue = "";
}

export const {
  addTodo,
  deleteTodo,
  startEditingTodo,
  finishEditingTodo,
  cancelEditingTodo,
  changeInputValue,
  changeEditInputValue,
} = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectInputValue = (state: RootState) => state.todos.inputValue;
export const selectEditInputValue = (state: RootState) =>
  state.todos.editInputValue;
export const selectCurrentlyEditedTodo = (state: RootState) =>
  state.todos.currentlyEditedTodo;

export default todosSlice.reducer;
