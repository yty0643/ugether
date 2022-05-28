import React, { useEffect, useState } from "react";
import styles from "./test.module.css";

const Test = ({ dbService }) => {
  const onClick = () => {
    dbService.update("users/xo0643@naver/linkVideo", "kX0eHza8Zgo");
  };

  return (
    <div className={styles.test}>
      <iframe
        className={styles.video}
        type="text/html"
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/kX0eHza8Zgo/?start=61&autoplay=1&mute=1`}
        frameBorder="0"
        allowFullScreen
        start="50"
      ></iframe>
      <button className={styles.btn} onClick={onClick}>
        db
      </button>
    </div>
  );
};

export default Test;
