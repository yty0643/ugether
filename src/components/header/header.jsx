import React from "react";
import styles from "./header.module.css";

const Header = ({ user, partner }) => {
  return (
    <header className={styles.header}>
      <div>logo</div>
      <div>search</div>
      <div>
        <button>
          <img src={user.img} />
        </button>
        <button>
          <img src="" alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
