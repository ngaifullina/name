import React from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectTodos,
  startEditingTodo,
  finishEditingTodo,
  cancelEditingTodo,
  deleteTodo,
  editEditingValue,
  selectEditInputValue,
  selectCurrentlyEditedTodo,
} from "../todos/slice";
import styles from "./TodosList.module.css";
import { useState } from "react";
export function TodosList(props: { readonly?: boolean }) {
  const todosList = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(selectEditInputValue);
  const showEdit = useAppSelector(selectCurrentlyEditedTodo);
  const handleDelete = (index: number) => {
    dispatch(deleteTodo(index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editEditingValue(e.target.value));
  };

  const submit = (index: number) => {
    dispatch(finishEditingTodo(index));
  };

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
                      dispatch(startEditingTodo(i));
                    }}
                  />
                  <div
                    className={styles.close}
                    onClick={() => handleDelete(i)}
                  ></div>
                  {showEdit === i && (
                    <div>
                      <input
                        className={styles.textbox}
                        aria-label="Edit todo"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Edit todo.."
                      />
                      <div>
                        <button
                          className={styles.button}
                          onClick={() => submit(i)}
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
