import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./chat.module.css";

const Chat = ({ userMsg, partMsg, sendMsg }) => {
  console.log(userMsg);
  console.log(partMsg);
  const inputRef = useRef();
  return (
    <section className={styles.chat}>
      <div className={styles.content}>
        <p className={styles.you}>aaaaaaaaaa</p>
        <p className={styles.me}>bbbbbbbbbb</p>
        <p className={styles.you}>aaaaaaaaaa</p>
        <p className={styles.me}>bbbbbbbbbb</p>
        <p className={styles.you}>aaaaaaaaaa</p>
        <p className={styles.me}>bbbbbbbbbb</p>
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
