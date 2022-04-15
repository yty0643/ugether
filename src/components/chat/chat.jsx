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
                className={`${styles.msg} ${
                  user.email == item.user ? styles.me : styles.you
                }`}
                key={index}
              >
                {item.msg}
              </p>
            );
          })}
      </div>
      <div className={styles.submit}>
        <textarea
          className={styles.input}
          ref={inputRef}
          placeholder="메세지 입력"
          onKeyUp={(event) => {
            if (!(event.key == "Enter")) return;
            sendMsg(inputRef.current.value);
            inputRef.current.value = "";
          }}
        />
        <button
          className={styles.sendBtn}
          onClick={() => {
            sendMsg(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
        </button>
      </div>
    </section>
  );
};

export default Chat;
