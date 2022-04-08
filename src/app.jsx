import React, { useEffect, useState, useRef } from "react";
import styles from "./app.module.css";
import Login from "./components/login/login";

const App = ({ kakaoService, dbService }) => {
  const [user, setUser] = useState();
  const [isLink, setIsLink] = useState();
  const signOut = () => {
    kakaoService.signOut();
    window.location.href = "/";
    window.localStorage.removeItem("token");
    // setToken("");
  };
  useEffect(() => {
    if (!isLink) return;
    console.log("inLink: " + isLink);
    dbService.update(user.email, "isLink", true);
  }, [isLink]);

  return (
    <div className={styles.app}>
      {!isLink && (
        <Login
          kakaoService={kakaoService}
          dbService={dbService}
          user={user}
          setUser={setUser}
          setIsLink={setIsLink}
        />
      )}
      {isLink && (
        <div>
          <button onClick={signOut}>signOut</button>
        </div>
      )}
    </div>
  );
};

export default App;
