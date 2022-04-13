import React, { useRef } from "react";
import styles from "./video_storage.module.css";
const VideoStorage = ({ videoStorage, addURL, delURL }) => {
  const inputRef = useRef();
  return (
    <section className={styles.videoStorage}>
      <div>
        {videoStorage &&
          videoStorage.map((item, index) => {
            return (
              <div key={index}>
                <p>{item.url}</p>
                <button
                  onClick={() => {
                    delURL(item.date);
                  }}
                >
                  del
                </button>
              </div>
            );
          })}
      </div>
      <div>
        <input ref={inputRef} type="text" />
        <button
          onClick={() => {
            addURL(inputRef.current.value);
          }}
        >
          add
        </button>
      </div>
    </section>
  );
};

export default VideoStorage;
