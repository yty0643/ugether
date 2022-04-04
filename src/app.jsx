import React, { useEffect, useState } from "react";
import Chat from "./components/chat/chat";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import PlayList from "./components/playList/playList";

const App = ({ kakaoService }) => {
  const signIn = () => {
    kakaoService.getAuthCode();
  };

  useEffect(() => {
    if (!window.location.search) return;
    const authCode = window.location.search.split("=")[1];
    kakaoService //
      .getToken(authCode)
      .then((res) => kakaoService.getUser(res.access_token))
      .then((res) => console.log(res));
  }, [window.location]);

  return (
    <div>
      <Header />
      <PlayList />
      <Chat />
      <Footer />
      <button onClick={signIn}>signIn</button>
    </div>
  );
};

export default App;
