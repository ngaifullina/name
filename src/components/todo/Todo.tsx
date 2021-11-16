import styles from "./Todo.module.css";
import { Icon } from "../icon/Icon";

export type Props = {
  readonly?: boolean;
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
        {!readonly && editValue !== null && (
          <span>
            {/* disable tick on empty input */}
            {editValue !== "" && <Icon type="tick" onClick={onEditFinish} />}
            <Icon type="cross" onClick={onEditCancel} />
          </span>
        )}
        {!readonly && editValue === null && (
          <span>
            <Icon type="edit" onClick={onEditStart} />
            <Icon type="delete" onClick={onDelete} />
          </span>
        )}
      </div>
      {name}

      {editValue !== null && (
        <div className={styles.edit}>
          <input
            className={styles.input}
            value={editValue}
            onChange={(e) => onEdit(e.target.value)}
            autoFocus={true}
          />
        </div>
      )}
    </div>
  );
}
