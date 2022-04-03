import React from "react";
import Chat from "./components/chat/chat";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import PlayList from "./components/playList/playList";

const App = (props) => {
  return (
    <div>
      <Header />
      <PlayList />
      <Chat />
      <Footer />
    </div>
  );
};

export default App;
