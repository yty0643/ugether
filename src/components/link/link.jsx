import React, { useRef } from "react";
import styles from "./link.module.css";

const Link = ({ user, userLink }) => {
  const emailRef = useRef();
  return (
    <div className={styles.link}>
      <div className={styles.contents}>
        <p>내 코드</p>
        <p>{user.email}</p>
        <input type="text" ref={emailRef} />
        <button
          onClick={() => {
            userLink(emailRef.current.value);
          }}
        >
          link
        </button>
      </div>
    </div>
  );
};
export default Link;
