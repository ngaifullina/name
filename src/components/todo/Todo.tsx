import React from "react";
import styles from "./Todo.module.css";

export type Props = {
  name: string;
  editValue: string | null;
  onDelete: () => void;
  onEdit: (newValue: string) => void;
  onEditStart: () => void;
  onEditFinish: () => void;
  onEditCancel: () => void;
};

export function Todo({
  name,
  editValue,
  onDelete,
  onEdit,
  onEditCancel,
  onEditFinish,
  onEditStart,
}: Props) {
  return (
    <div className={styles.name}>
      {/* <div className="icon-group">
      {isEdited ? <Icon type="tick" /> : null }
      <Icon type="cross" />
      { <Icon type="edit" />
      <Icon type="delete" />
    </div> */}
      {name}
      <img
        src="edit.svg"
        alt="edit"
        className={styles.icon}
        onClick={onEditStart}
      />

      <img
        src="delete.svg"
        alt="delete"
        className={styles.delete}
        onClick={onDelete}
      />
      {editValue && (
        <div className={styles.edit}>
          <input
            className={styles.textbox}
            aria-label="Edit todo"
            value={editValue}
            onChange={(e) => onEdit(e.target.value)}
            placeholder="Edit todo.."
          />
          <img
            src="checked.svg"
            alt="checked"
            className={styles.checked}
            onClick={onEditFinish}
          />
          <div className={styles.close} onClick={onEditCancel}></div>
        </div>
      )}
    </div>
  );
}
