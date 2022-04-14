import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Main from "./components/main/main";
import styles from "./app.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faVideo,
  faMagnifyingGlass,
  faArrowUp,
  faComment,
  faXmark,
  faArrowRightToBracket,
  faLinkSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //필요한 컴포넌트에서 import
import Test from "./test";
library.add(
  faUser,
  faVideo,
  faGithub,
  faMagnifyingGlass,
  faYoutube,
  faArrowUp,
  faComment,
  faXmark,
  faArrowRightToBracket,
  faLinkSlash,
  faEnvelope
);

const App = ({ kakaoService, dbService, youtube }) => {
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
            element={
              <Main
                kakaoService={kakaoService}
                dbService={dbService}
                youtube={youtube}
              />
            }
          />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
