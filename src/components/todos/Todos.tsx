import React from "react";
import { useHistory } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTodo, selectInputValue, editInputValue } from "./slice";
import styles from "./Todos.module.css";
import { TodosList } from "../todo-list/TodosList";
export function Todos() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectInputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editInputValue(e.target.value));
  };

  const submit = () => {
    dispatch(addTodo());
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <input
          className={styles.textbox}
          aria-label="Set todo"
          value={value}
          onChange={handleInputChange}
          placeholder="Write todo.."
        />
        <div>
          <button className={styles.button} onClick={submit}>
            Add todo
          </button>
        </div>
        <TodosList />
      </div>

      <div>
        <button className={styles.button} onClick={() => history.push("/list")}>
          Show a list of todos
        </button>
      </div>
    </div>
  );
}
