import React, { useRef } from "react";
import styles from "./video_storage.module.css";
const VideoStorage = ({ videoStorage, sharingVideo }) => {
  const inputRef = useRef();
  return (
    <section className={styles.videoStorage}>
      <div>
        {videoStorage &&
          videoStorage.map((item, index) => {
            return <p key={index}>{item.url}</p>;
          })}
      </div>
      <div>
        <input ref={inputRef} type="text" />
        <button
          onClick={() => {
            sharingVideo(inputRef.current.value);
          }}
        >
          add
        </button>
      </div>
    </section>
  );
};

export default VideoStorage;
