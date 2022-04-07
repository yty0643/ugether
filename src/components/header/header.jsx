import React from "react";
import styles from "./header.module.css";

const Header = ({ nickname, thumbnail, email }) => {
  return (
    <header className={styles.header}>
      <div>logo div</div>
      <div>search div</div>
      <div>
        <button>
          <img src="" alt="" />
        </button>
        <button>
          <img src={thumbnail} alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
