import React from "react";
import styles from "./Home.module.scss";
interface IProps {}
export const Home: React.FC<IProps> = () => {
  return <div className={styles.wrapper}>Test home</div>;
};
