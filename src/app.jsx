import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Main from "./components/main/main";
import styles from "./app.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //필요한 컴포넌트에서 import
import Test from "./test";
library.add(faUser, faTwitter, faFontAwesome);

const App = ({ kakaoService, dbService }) => {
  return (
    <div className={styles.app}>
      {/* basename="/ugether" */}
      <BrowserRouter>
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
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
