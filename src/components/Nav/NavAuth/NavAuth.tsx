import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavAuth.module.scss";

interface IProps {}
export const NavAuth: React.FC<IProps> = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.list_item}>
        <Link to="/login">Login</Link>
      </li>
      <li className={styles.list_item}>
        <Link to="/registration">Register</Link>
      </li>
    </ul>
  );
};
