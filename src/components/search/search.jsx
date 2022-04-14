import React, { useRef } from "react";
import styles from "./search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({ xActive, search, searchActiveHandle }) => {
  const keywordRef = useRef();

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        ref={keywordRef}
        type="text"
        placeholder="검색"
        onChange={() => {
          searchActiveHandle(keywordRef.current.value);
        }}
        onKeyUp={(event) => {
          if (!(event.key == "Enter")) return;
          search(keywordRef.current.value);
        }}
      />
      <button
        className={`${styles.xBtn} ${xActive && styles.active}`}
        onClick={() => {
          keywordRef.current.value = "";
          searchActiveHandle(keywordRef.current.value);
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </button>
      <button
        className={styles.searchBtn}
        onClick={() => {
          search(keywordRef.current.value);
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  );
};

export default Search;
