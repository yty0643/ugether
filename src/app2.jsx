import React, { useEffect, useState, useRef } from "react";
import styles from "./app.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faUser, faTwitter, faFontAwesome);

const App = ({ kakaoService, dbService }) => {
  const myStorage = window.localStorage;
  const myLocation = window.location;
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );
  const [user, setUser] = useState(); // nickname,thumbnail,email
  const [connectUser, setConnectUser] = useState();
  const [isConnect, setIsConnect] = useState();
  const [isLink, setIsLink] = useState();
  const codeRef = useRef();

  const signIn = () => {
    kakaoService.signIn();
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

  const connect = () => {
    if (codeRef.current.value == user.email) return;
    dbService
      .read(codeRef.current.value)
      .then((res) => {
        if (!res) throw new Error("No data");
        dbService.update(user.email, codeRef.current.value);
        setConnectUser(res);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (myStorage.getItem("token") == "undefined")
      myStorage.removeItem("token");
    if (myStorage.getItem("token")) return;
    if (!myLocation.search) return;
    const AUTHORIZE_CODE = myLocation.search.split("=")[1];
    kakaoService //
      .createAccessToken(AUTHORIZE_CODE)
      .then((res) => {
        myStorage.setItem("token", JSON.stringify(res.access_token));
        setToken(res.access_token);
      });
  }, [myLocation.search]);

  useEffect(() => {
    if (!token) return;
    kakaoService.setAccessToken(token);
    kakaoService.getUser(setUser);
  }, [token]);

  useEffect(() => {
    if (!user) return;
    dbService //
      .read(user.email)
      .then((res) => {
        if (!res) {
          dbService.write(...Object.values(user));
          dbService.read(user.email).then((res) => console.log(res));
        }
        dbService.observer(user.email, setIsConnect);
      });
  }, [user]);

  useEffect(() => {
    if ((connectUser, isConnect)) setIsLink(true);
  }, [connectUser, isConnect]);

  return (
    <div className={styles.app}>
      {!user && (
        <section className={styles.loginSection}>
          <p>유게더</p>
          <button className={styles.signInBtn} onClick={signIn}>
            Start with Kakao
          </button>
          <button onClick={signOut}>signOut</button>
        </section>
      )}
      {user && !isLink && (
        <section className={styles.linkSection}>
          <p>사용자 연결</p>
          <img src={user.thumbnail} alt="" />
          <input ref={codeRef} type="text" />
          <button onClick={connect}>connect</button>
        </section>
      )}
      {user && isLink && <section className={styles.mainSection}></section>}
    </div>
  );
};

export default App;

// const link = () => {
//   if (codeRef.current.value == user.email) return;
//   dbService
//     .read(codeRef.current.value)
//     .then((res) => {
//       if (!res) throw new Error("No data");
//       dbService.update(user.email, "partner", codeRef.current.value);
//       dbService.observer(user.email, codeRef.current.value, setIsLink);
//     })
//     .catch((error) => console.log(error));
//   //observer 생성한 이후 input 상호작용x
//   //에러발생시 input비우기
// };

// useEffect(() => {
//   if (!user) return;
//   dbService //
//     .read(user.email)
//     .then((res) => {
//       let ret;
//       if (!res) {
//         dbService.write(...Object.values(user));
//         dbService.read(user.email).then((res) => (ret = res));
//       } else {
//         ret = res;
//       }
//       return ret;
//     })
//     .then((res) => {
//       if (res.isLink) setIsLink(true);
//       dbService.observer(user.email, res.partner, setIsLink);
//     });
// }, [user]);
