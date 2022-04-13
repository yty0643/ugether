import React, { useRef } from "react";
import UserMenu from "../user_menu/user_menu";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  user,
  partner,
  user_menu,
  setUser_menu,
  signOut,
  kakaoMsg,
  search,
  goHome,
}) => {
  const keywordRef = useRef();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <button className={styles.logoBtn} onClick={goHome}>
          <FontAwesomeIcon icon="fa-solid fa-video" />
        </button>
        <p className={styles.title}>유게더</p>
      </div>
      <div className={styles.search}>
        <input className={styles.searchInput} ref={keywordRef} type="text" />
        <button
          className={styles.searchBtn}
          onClick={() => {
            search(keywordRef.current.value);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </button>
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
