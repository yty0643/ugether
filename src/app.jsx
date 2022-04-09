import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Main from "./components/main/main";
import styles from "./app.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //필요한 컴포넌트에서 import
library.add(faUser, faTwitter, faFontAwesome);

const App = ({ kakaoService, dbService }) => {
  return (
    <div className={styles.app}>
      <BrowserRouter basename="/ugether">
        <Routes>
          <Route
            path="/"
            element={
              <Login kakaoService={kakaoService} dbService={dbService} />
            }
          />
          <Route
            path="/main"
            element={<Main kakaoService={kakaoService} dbService={dbService} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
