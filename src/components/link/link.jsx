import React, { useRef } from "react";
import styles from "./link.module.css";

const Link = ({ user, userLink }) => {
  const emailRef = useRef();
  return (
    <div className={styles.link}>
      <div className={styles.contents}>
        <p className={styles.title}>Start with link</p>
        <p className={styles.code}>my code: {user.email}</p>
        <input
          className={styles.input}
          type="text"
          ref={emailRef}
          placeholder="친구 코드 입력"
          onKeyUp={(e) => {
            if (e.key == "Enter") {
              userLink(emailRef.current.value);
              emailRef.current.value = "";
            }
          }}
        />
        <div className={styles.btns}>
          <button
            className={styles.linkBtn}
            onClick={() => {
              userLink(emailRef.current.value);
              emailRef.current.value = "";
            }}
          >
            Link !
          </button>
          <button
            className={styles.copyBtn}
            onClick={() => {
              navigator.clipboard.writeText(user.email);
            }}
          >
            Code Copy
          </button>
        </div>
      </div>
    </div>
  );
};
export default Link;
