import React, { useEffect, useState } from "react";
import Chat from "./components/chat/chat";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Video from "./components/video/video";
import styles from "./app.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";

library.add(fas, faTwitter, faFontAwesome);

const App = ({ kakaoService, dbService }) => {
  const myStorage = window.localStorage;
  const myLocation = window.location;
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );
  const [user, setUser] = useState(); // nickname,thumbnail,email
  const [linkedUser, setLinkedUser] = useState();

  const signIn = () => {
    kakaoService.signIn();
  };

  const signOut = () => {
    kakaoService.signOut();
    myLocation.href = "/";
    myStorage.removeItem("token");
    setToken("");
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
        console.log(res);
      });
  }, [user]);

  return (
    <div className={styles.app}>
      <Header {...user} />
      <Video />
      <Chat />
      <Footer />
      <button onClick={signIn}>IN</button>
      <button onClick={signOut}>OUT</button>
    </div>
  );
};

export default App;
