import styles from "./Icon.module.css";

export type Props = {
  type: "delete" | "edit" | "tick" | "cross";
  onClick: () => void;
};

export function Icon({ type, onClick }: Props) {
  return (
    <img src={`${type}.svg`} alt="" className={styles.icon} onClick={onClick} />
  );
}
