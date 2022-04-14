import React from "react";
import styles from "./logo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Logo = ({ goHome }) => {
  return (
    <button className={styles.logo} onClick={goHome}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon="fa-brands fa-youtube" />
      </div>
      <div className={styles.vertical}></div>
      <div className={styles.description}>
        <p className={styles.title}>Ugether</p>
        <p className={styles.subTitle}>YouTube Together</p>
      </div>
    </button>
  );
};

export default Logo;
