import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  addTodo,
  deleteTodo,
  changeInputValue,
  changeEditInputValue,
  startEditingTodo,
  finishEditingTodo,
  cancelEditingTodo,
  selectTodos,
  selectInputValue,
  selectEditInputValue,
  selectCurrentlyEditedTodo,
} from "./slice";
import styles from "./TodoList.module.css";
import { Todo } from "../todo/Todo";
import { useEffect } from "react";

export type Props = { readonly?: boolean };

export function TodoList({ readonly }: Props) {
  const dispatch = useAppDispatch();

  const todos = useAppSelector<{ name: string }[]>(selectTodos);
  const inputValue = useAppSelector(selectInputValue);
  const editInputValue = useAppSelector(selectEditInputValue);
  const currentlyEditedTodo = useAppSelector(selectCurrentlyEditedTodo);

  // cancel editing whenever component becomes readonly
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
            value={inputValue}
            onChange={(e) => dispatch(changeInputValue(e.target.value))}
            placeholder="Write todo.."
          />
          <div>
            <button
              className={styles.button}
              onClick={() => dispatch(addTodo())}
            >
              Add todo
            </button>
          </div>
        </div>
      )}

      <h1 className={styles.header}>Your Todos:</h1>

      {!!todos.length && (
        <div>
          {todos.map((todo, i) => (
            <Todo
              key={`${todo.name}_${i}`}
              readonly={readonly}
              name={todo.name}
              editValue={currentlyEditedTodo === i ? editInputValue : null}
              onEditCancel={() => dispatch(cancelEditingTodo())}
              onDelete={() => dispatch(deleteTodo(i))}
              onEdit={(newValue) => dispatch(changeEditInputValue(newValue))}
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
