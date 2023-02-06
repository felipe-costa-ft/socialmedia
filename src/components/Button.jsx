import React from "react";
import styles from "@/styles/Button.module.css";

const Button = ({ text, color, onClick }) => (
  <button
    className={styles.button}
    style={{ backgroundColor: color }}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
