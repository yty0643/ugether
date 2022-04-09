import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const Login = ({ kakaoService, dbService }) => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );
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
    <section className={styles.loginSection}>
      <p className={styles.title}>유게더</p>
      <button className={styles.signInBtn} onClick={signIn}>
        Start with Kakao
      </button>
    </section>
  );
};

export default Login;
