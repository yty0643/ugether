import React, { useRef } from "react";
import styles from "./video_storage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VideoStorage = ({ videoStorage, addURL, delURL, URLClick }) => {
  const inputRef = useRef();
  return (
    <section className={styles.videoStorage}>
      <div className={styles.cardList}>
        {videoStorage &&
          videoStorage.map((item, index) => {
            return (
              item.video && (
                <div
                  className={styles.card}
                  key={index}
                  onClick={() => {
                    URLClick(item.video);
                  }}
                >
                  <p className={styles.title}>{item.video.snippet.title}</p>
                  <button
                    className={styles.delBtn}
                    onClick={() => {
                      delURL(item.date);
                    }}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-minus" />
                  </button>
                </div>
              )
            );
          })}
      </div>
      <div className={styles.addForm}>
        <input
          className={styles.input}
          ref={inputRef}
          type="text"
          placeholder="URL 입력"
        />
        <button
          className={styles.addBtn}
          onClick={() => {
            addURL(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" />
        </button>
      </div>
    </section>
  );
};

export default VideoStorage;
