import React, { useEffect, useState, useRef } from "react";
import styles from "./login.module.css";

const Login = ({ kakaoService, dbService, user, setUser, setIsLink }) => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );
  const codeRef = useRef();
  const storage = window.localStorage;
  const location = window.location;

  const signIn = () => {
    kakaoService.signIn();
  };

  const link = () => {
    if (codeRef.current.value == user.email) return;
    dbService
      .read(codeRef.current.value)
      .then((res) => {
        if (!res) throw new Error("No data");
        dbService.update(user.email, "partner", codeRef.current.value);
        dbService.observer(user.email, codeRef.current.value, setIsLink);
      })
      .catch((error) => console.log(error));
    //observer 생성한 이후 input 상호작용x
    //에러발생시 input비우기
  };

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

  useEffect(() => {
    if (!token) return;
    kakaoService.setAccessToken(token);
    kakaoService
      .getUser(setUser)
      .then((res) => {
        setUser(res.user);
        return dbService.read(res.email);
      })
      .then((res) => {
        if (res.isLink) setIsLink(true);
      });
  }, [token]);

  useEffect(() => {
    if (!user) return;
    dbService //
      .read(user.email)
      .then((res) => {
        let ret;
        if (!res) {
          dbService.write(...Object.values(user));
          dbService.read(user.email).then((res) => (ret = res));
        } else {
          ret = res;
        }
        return ret;
      })
      .then((res) => {
        if (res.isLink) setIsLink(true);
        dbService.observer(user.email, res.partner, setIsLink);
      });
  }, [user]);

  return (
    <section className={styles.loginSection}>
      {!user && (
        <div>
          <p className={styles.title}>유게더</p>
          <button className={styles.signInBtn} onClick={signIn}>
            Start with Kakao
          </button>
        </div>
      )}
      {user && (
        <div>
          <p>사용자 연결</p>
          <img src={user.thumbnail} alt="" />
          <input ref={codeRef} type="text" />
          <button onClick={link}>link</button>
        </div>
      )}
    </section>
  );
};

export default Login;
