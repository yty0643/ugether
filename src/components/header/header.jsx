import React from "react";
import styles from "./header.module.css";

const Header = ({ user, partner }) => {
  //user undefined 일때 있다 수정하자
  return (
    <header className={styles.header}>
      <div>logo</div>
      <div>search</div>
      <div>
        <button>
          <img src="" />
        </button>
        <button>
          <img src="" alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
