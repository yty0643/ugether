import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Link from "../link/link";
import styles from "./main.module.css";

const Main = ({ kakaoService, dbService }) => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );
  const [user, setUser] = useState(); //email, name, image, img(thumbnail)
  const [pEmail, setPEmail] = useState();
  const [partner, setPartner] = useState();
  const [isLink, setIsLink] = useState();
  const navigate = useNavigate();

  const signOut = () => {
    kakaoService.signOut();
    window.localStorage.removeItem("token");
    setToken();
  };

  const sendMsg = () => {
    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: `${user.nickname}님으로 부터 ugether 사용자 연결 요청을 받았습니다.`,
      link: {
        mobileWebUrl: "https://developers.kakao.com/",
        webUrl: "https://developers.kakao.com",
        iosExecutionParams: "https://developers.kakao.com",
      },
      buttons: [
        {
          title: "연결하기",
          link: {
            mobileWebUrl: `http://localhost:3000/?${user.email}`,
            webUrl: `http://localhost:3000/?${user.email}`,
          },
        },
      ],
    });
  };

  const userLink = (email) => {
    if (email == user.email) return;
    dbService
      .read(email)
      .then((res) => {
        if (!res) throw new Error("No data");
        dbService.update(user.email, "partner", email);
        dbService.linkObserver(user.email, email, () => {
          setIsLink(true);
          dbService.update(user.email, "isLink", true);
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let email;
    kakaoService.getUser().then((res) => {
      setUser(res);
      dbService.read(res.email).then((res) => {
        setPEmail(res.partner);
        email = res.email;
        if (!res) throw new Error("No data");
        setIsLink(res.isLink);
      });
      dbService.update(res.email, "isOnline", true);
    });
    return () => {
      dbService.update(email, "isOnline", false);
    };
  }, []);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    if (!isLink) return;
    dbService.partnerObserver(pEmail, setPartner);
  }, [isLink]);

  return (
    <div className={styles.main}>
      <Header user={user} partner={partner} />
      <button onClick={signOut}>SignOut</button>
      {isLink == false && <Link user={user} userLink={userLink} />}
    </div>
  );
};

export default Main;
