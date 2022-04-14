import React from "react";
import styles from "./user_btns.module.css";

const UserBtns = ({ user, partner, setUser_menu, setPartner_menu }) => {
  return (
    <div className={styles.userBtns}>
      {partner && (
        <button
          className={styles.partnerBtn}
          onClick={() => {
            setUser_menu(false);
            setPartner_menu((partner_menu) => !partner_menu);
          }}
        >
          <img src={partner.img} />
          <div
            className={`${styles.cover} ${partner.isOnline && styles.hide}`}
          ></div>
        </button>
      )}
      <button className={styles.heart}>❤️</button>
      {user && (
        <button
          className={styles.userBtn}
          onClick={() => {
            setUser_menu((user_menu) => !user_menu);
            setPartner_menu(false);
          }}
        >
          <img src={user.img} />
          <div className={`${styles.cover} ${styles.hide}`}></div>
        </button>
      )}
    </div>
  );
};

export default UserBtns;
