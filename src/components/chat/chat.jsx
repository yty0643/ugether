import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./chat.module.css";

const Chat = ({ user, chatStorage, sendMsg }) => {
  const inputRef = useRef();
  return (
    <section className={styles.chat}>
      <div className={styles.content}>
        {chatStorage &&
          chatStorage.map((item, index) => {
            return (
              <p
                className={user.email == item.user ? styles.me : styles.you}
                key={index}
              >
                {item.msg}
              </p>
            );
          })}
      </div>
      <div className={styles.submit}>
        <input className={styles.input} type="text" ref={inputRef} />
        <button
          className={styles.sendBtn}
          onClick={() => {
            sendMsg(inputRef.current.value);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
        </button>
      </div>
    </section>
  );
};

export default Chat;
