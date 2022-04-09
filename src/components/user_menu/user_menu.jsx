import React from "react";
import styles from "./user_menu.module.css";

const UserMenu = ({ user, signOut }) => {
  return (
    <div className={styles.userMenu}>
      <p>Sign in as {user.email.split("@")[0]}</p>
      <div className={styles.horizontal}></div>
      <p onClick={signOut}>Sign out</p>
    </div>
  );
};

export default UserMenu;
