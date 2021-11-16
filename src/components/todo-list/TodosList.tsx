import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
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
import { Todo } from "../todo/Todo";

export function TodosList(props: { readonly?: boolean }) {
  const todosList = useAppSelector<{ name: string }[]>(selectTodos);
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(selectEditInputValue);
  const currentlyEditedTodo = useAppSelector(selectCurrentlyEditedTodo);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Your Todos:</h1>
      {!!todosList.length && (
        <div>
          {todosList.map((todo, i) => (
            <Todo
              key={`${todo.name}_${i}`}
              name={todo.name}
              editValue={currentlyEditedTodo === i ? inputValue : null}
              onEditCancel={() => dispatch(cancelEditingTodo())}
              onDelete={() => dispatch(deleteTodo(i))}
              onEdit={(newValue) => dispatch(editEditingValue(newValue))}
              onEditFinish={() => dispatch(finishEditingTodo(i))}
              onEditStart={() => {
                dispatch(startEditingTodo(i));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
