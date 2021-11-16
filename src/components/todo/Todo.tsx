import styles from "./Todo.module.css";
import { Icon } from "../icon/Icon";
export type Props = {
  name: string;
  editValue: string | null;
  readonly?: boolean;
  onDelete: () => void;
  onEdit: (newValue: string) => void;
  onEditStart: () => void;
  onEditFinish: () => void;
  onEditCancel: () => void;
};

export function Todo({
  name,
  readonly,
  editValue,
  onDelete,
  onEdit,
  onEditCancel,
  onEditFinish,
  onEditStart,
}: Props) {
  return (
    <div className={styles.name}>
      <div className={styles.icongroup}>
        {!readonly && editValue && (
          <div>
            <Icon type="tick" handleClick={onEditFinish} />
            <Icon type="cross" handleClick={onEditCancel} />
          </div>
        )}
        {!readonly && !editValue && (
          <div>
            <Icon type="edit" handleClick={onEditStart} />
            <Icon type="delete" handleClick={onDelete} />
          </div>
        )}
      </div>
      {name}

      {editValue && (
        <div className={styles.edit}>
          <input
            className={styles.textbox}
            aria-label="Edit todo"
            value={editValue}
            onChange={(e) => onEdit(e.target.value)}
            placeholder="Edit todo.."
            autoFocus={true}
          />
        </div>
      )}
    </div>
  );
}
