import React from "react";
import styles from "./video.module.css";

const Video = ({ video }) => {
  return (
    <section className={styles.detail}>
      <iframe
        className={styles.video}
        type="text/html"
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
        start="50"
      ></iframe>
      <div className={styles.box}>
        <div>
          <h2 className={styles.title}>{video.snippet.title}</h2>
          <h2 className={styles.channelTitle}>{video.snippet.channelTitle}</h2>
          <pre className={styles.description}>{video.snippet.description}</pre>
        </div>
        <button className={styles.btn} onClick={() => {}}>
          같이보기
        </button>
      </div>
    </section>
  );
};
export default Video;
