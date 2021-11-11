import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectTodos,
  editTodo,
  deleteTodo,
  selectInputValue,
  editInputValue,
} from "../todos/slice";
import styles from "./TodosList.module.css";
import { useState } from "react";
export function TodosList(props: { readonly?: boolean }) {
  const todosList = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const value = useAppSelector(selectInputValue);

  const handleDelete = (name: string) => {
    dispatch(deleteTodo(name));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editInputValue(e.target.value));
  };

  const submit = (name: string) => {
    dispatch(editTodo(name));
    setShowEdit(false);
  };

  const [showEdit, setShowEdit] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Todos:</h1>
      {!!todosList.length && (
        <div className={styles.row}>
          {todosList.map((todo, i) => (
            <div key={`${todo.name}_${i}`} className={styles.name}>
              {todo.name}
              {!props.readonly ? (
                <div>
                  <img
                    src="edit.svg"
                    alt="edit"
                    className={styles.icon}
                    onClick={() => {
                      setShowEdit(true);
                      dispatch(editInputValue(todo.name));
                    }}
                  />
                  <div
                    className={styles.close}
                    onClick={() => handleDelete(todo.name)}
                  ></div>
                  {showEdit && (
                    <div>
                      <input
                        className={styles.textbox}
                        aria-label="Edit todo"
                        value={value}
                        onChange={handleInputChange}
                        placeholder="Edit todo.."
                      />
                      <div>
                        <button
                          className={styles.button}
                          onClick={() => submit(todo.name)}
                        >
                          Edit todo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
