import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ kakaoService, dbService }) => {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") != "undefined" &&
      JSON.parse(window.localStorage.getItem("token"))
  );
  const [active, setActive] = useState();
  const [active2, setActive2] = useState();
  const [active3, setActive3] = useState();
  const [active4, setActive4] = useState();
  const [active5, setActive5] = useState();
  const [contact, setContact] = useState("Contact");
  const [copy, setCopy] = useState();
  const navigate = useNavigate();
  const storage = window.localStorage;
  const location = window.location;

  const signIn = () => {
    kakaoService.signIn();
  };

  useEffect(() => {
    if (!token) return;
    kakaoService.setAccessToken(token);
    navigate("/main");
  }, [token]);

  useEffect(() => {
    if (storage.getItem("token") == "undefined") storage.removeItem("token");
    if (!location.search || storage.getItem("token")) return;
    const AUTHORIZE_CODE = location.search.split("=")[1];
    kakaoService //
      .createAccessToken(AUTHORIZE_CODE)
      .then((res) => {
        storage.setItem("token", JSON.stringify(res.access_token));
        setToken(res.access_token);
      });
  }, [location.search]);

  return (
    <section className={styles.login}>
      <div className={styles.box}>
        <div className={styles.btns}>
          <a href="https://youtube.com" target="_blank">
            <button
              className={styles.youtubeBtn}
              onMouseEnter={() => {
                setActive3(true);
              }}
              onMouseLeave={() => {
                setActive3(false);
              }}
            >
              <FontAwesomeIcon icon="fa-brands fa-youtube" />
            </button>
          </a>
          <button
            className={styles.kakaoBtn}
            onClick={signIn}
            onMouseEnter={() => {
              setActive4(true);
            }}
            onMouseLeave={() => {
              setActive4(false);
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-comment" />
            <p className={styles.kakaoTitle}>TALK</p>
          </button>
          <a href="https://github.com/yty0643" target="_blank">
            <button
              className={styles.githubIcon}
              onMouseEnter={() => {
                setActive5(true);
              }}
              onMouseLeave={() => {
                setActive5(false);
              }}
            >
              <FontAwesomeIcon icon="fa-brands fa-github" />
            </button>
          </a>
        </div>
        <div className={styles.title}>
          <p
            className={styles.f}
            onMouseEnter={() => {
              setActive(true);
            }}
            onMouseLeave={() => {
              setActive(false);
            }}
          >
            유
          </p>
          <p
            className={styles.s}
            onMouseEnter={() => {
              setActive2(true);
            }}
            onMouseLeave={() => {
              setActive2(false);
            }}
          >
            게
          </p>
          <p
            className={styles.s}
            onMouseEnter={() => {
              setActive2(true);
            }}
            onMouseLeave={() => {
              setActive2(false);
            }}
          >
            더
          </p>
        </div>
        <p className={`${styles.description} ${active && styles.active}`}>
          YouTube
        </p>
        <p className={`${styles.description} ${active2 && styles.active}`}>
          Together
        </p>
        <p className={`${styles.description2} ${active3 && styles.active2}`}>
          YouTube
        </p>
        <p className={`${styles.description2} ${active4 && styles.active2}`}>
          Sign-in with kakao
        </p>
        <p className={`${styles.description2} ${active5 && styles.active2}`}>
          Visit GitHub
        </p>
      </div>
      <div className={styles.contactBox}>
        <p
          className={styles.contact}
          onClick={() => {
            setCopy(true);
            navigator.clipboard.writeText("xo0643@naver.com");
            setTimeout(() => {
              setCopy(false);
            }, 1500);
          }}
          onMouseEnter={() => {
            setContact("xo0643@naver.com");
          }}
          onMouseLeave={() => {
            setContact("Contact");
          }}
        >
          {contact}
        </p>
        <p className={`${styles.copy} ${copy && styles.visible}`}>coped!</p>
      </div>
      <p className={styles.footer}>2022 Tayoung - all rights reserved</p>
    </section>
  );
  <FontAwesomeIcon icon="fa-solid fa-video" />;
};

export default Login;
