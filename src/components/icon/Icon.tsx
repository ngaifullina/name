import React from "react";
import { useHistory } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTodo, selectInputValue, editInputValue } from "../todos/slice";
// import styles from "./Todos.module.css";
import { TodosList } from "../todo-list/TodosList";

export type Props = {
  type: "delete" | "edit" | "tick" | "cross";
};

// all icons should
// - have same size
// - be inline-block
// - same vertical alignment
export function Icon() {
  return <div></div>;
}
