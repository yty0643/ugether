import React from "react";
import styles from "./partner_menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //필요한 컴포넌트에서 import

const PartnerMenu = ({ user, partner, kakaoMsg }) => {
  return (
    <div className={styles.partnerMenu}>
      <button>
        <img className={styles.image} src={partner.img} />
      </button>
      <p className={styles.title}>
        {partner.isOnline ? "on-line" : "off-line"}
      </p>
      <div className={styles.horizontal}></div>
      <button className={styles.btn}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
        </div>
        <p className={styles.description} onClick={kakaoMsg}>
          Call in with Kakao
        </p>
      </button>
      <div className={styles.horizontal}></div>
    </div>
  );
};

export default PartnerMenu;
