import React from "react";
import styles from "./user_menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //필요한 컴포넌트에서 import

const UserMenu = ({ user, signOut, unlink }) => {
  return (
    <div className={styles.userMenu}>
      <button>
        <img className={styles.image} src={user.image} />
      </button>
      <p className={styles.title}>Sign in as {user.email.split("@")[0]}</p>
      <div className={styles.horizontal}></div>
      <button className={styles.btn}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" />
        </div>
        <p className={styles.description} onClick={signOut}>
          Sign out
        </p>
      </button>
      <button className={styles.btn}>
        <div className={styles.unlinkIcon}>
          <FontAwesomeIcon icon="fa-solid fa-link-slash" />
        </div>
        <p className={styles.description} onClick={unlink}>
          Unlink
        </p>
      </button>
      <div className={styles.horizontal}></div>
    </div>
    // <FontAwesomeIcon icon="fa-solid fa-link" />
    // <FontAwesomeIcon icon="fa-solid fa-link-slash" />
  );
};

export default UserMenu;
