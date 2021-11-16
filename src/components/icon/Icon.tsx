import React from "react";
import styles from "./Icon.module.css";

export type Props = {
  type: "delete" | "edit" | "tick" | "cross";
  handleClick: () => void;
};

// all icons should
// - have same size
// - be inline-block
// - same vertical alignment

export function Icon({ type, handleClick }: Props) {
  return (
    <img
      src={`${type}.svg`}
      alt=""
      className={styles.icon}
      onClick={handleClick}
    />
  );
}
