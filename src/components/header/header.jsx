import React from "react";
import UserMenu from "../user_menu/user_menu";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ user, partner, user_menu, setUser_menu, signOut }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon="fa-solid fa-video" />
      </div>
      <div className={styles.search}>
        <input className={styles.searchInput} type="text" />
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </div>
      <div className={styles.btns}>
        {partner && (
          <button className={styles.partnerBtn}>
            <img src={partner.img} />
            <div
              className={`${styles.cover} ${partner.isOnline && styles.hide}`}
            ></div>
          </button>
        )}
        <p className={styles.heart}>❤️</p>
        {user && (
          <button
            className={styles.userBtn}
            onClick={() => {
              setUser_menu((user_menu) => !user_menu);
            }}
          >
            <img src={user.img} />
            <div className={`${styles.cover} ${styles.hide}`}></div>
          </button>
        )}
        {user_menu && <UserMenu user={user} signOut={signOut} />}
      </div>
    </header>
  );
};

export default Header;
