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
  selectInputValue,
  editInputValue,
  addTodo,
} from "./slice";
import styles from "./TodoList.module.css";
import { Todo } from "../todo/Todo";
import { useEffect } from "react";
export function TodoList({ readonly }: { readonly?: boolean }) {
  const todosList = useAppSelector<{ name: string }[]>(selectTodos);
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(selectEditInputValue);
  const currentlyEditedTodo = useAppSelector(selectCurrentlyEditedTodo);

  const value = useAppSelector(selectInputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editInputValue(e.target.value));
  };

  const submit = () => {
    dispatch(addTodo());
  };

  useEffect(() => {
    if (readonly) {
      dispatch(cancelEditingTodo());
    }
  }, [readonly, dispatch]);

  return (
    <div>
      {!readonly && (
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
        </div>
      )}

      <h1 className={styles.header}>Your Todos:</h1>
      {!!todosList.length && (
        <div>
          {todosList.map((todo, i) => (
            <Todo
              readonly={readonly}
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
