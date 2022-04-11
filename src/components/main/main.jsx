import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../chat/chat";
import Header from "../header/header";
import Link from "../link/link";
import Video from "../video/video";
import VideoList from "../video_list/video_list";
import styles from "./main.module.css";

const Main = ({ kakaoService, dbService, youtube }) => {
  const [token, setToken] = useState(
    JSON.parse(window.localStorage.getItem("token"))
  );
  const [user, setUser] = useState(); //email, name, image, img(thumbnail)
  const [pEmail, setPEmail] = useState();
  const [partner, setPartner] = useState();
  const [isLink, setIsLink] = useState();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState();
  const [user_menu, setUser_menu] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    kakaoService.signOut();
    window.localStorage.removeItem("token");
    setToken();
  };

  const sendMsg = () => {
    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: `${user.nickname}님으로 부터 ugether 연결 요청을 받았습니다.`,
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
        dbService.update(user.email, "partner", email);
        dbService.linkObserver(user.email, email, () => {
          dbService.update(user.email, "isLink", true);
          setIsLink(true);
        });
      })
      .catch((error) => alert("Wrong code!"));
  };

  const search = (keyword) => {
    if (!keyword) return;
    youtube.search(keyword).then((res) => setVideos(res));
  };

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  useEffect(() => {
    kakaoService //
      .getUser()
      .then((res) => setUser(res))
      .catch((error) => {
        console.log(error);
        window.localStorage.removeItem("token");
        setToken();
      });
  }, []);

  useEffect(() => {
    if (!user) return;
    dbService //
      .read(user.email)
      .then((res) => {
        setIsLink(res.isLink);
        setPEmail(res.partner);
        dbService.update(user.email, "isOnline", true);
      })
      .catch((error) => {
        console.log(error);
        dbService //
          .write(...Object.values(user))
          .then(() => {
            setIsLink(false);
            setPEmail("");
            dbService.update(user.email, "isOnline", true);
          });
      });

    return () => {
      dbService.update(user.email, "isOnline", false);
    };
  }, [user]);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    if (!pEmail) return;
    dbService.partnerObserver(pEmail, setPartner);
  }, [pEmail]);

  useEffect(() => {}, [videos]);

  return (
    <div className={styles.main}>
      <Header
        user={user}
        partner={partner}
        user_menu={user_menu}
        setUser_menu={setUser_menu}
        signOut={signOut}
        sendMsg={sendMsg}
        search={search}
      />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <Video video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? "list" : "grid"}
          />
        </div>
        <div className={styles.chat}>
          <Chat />
        </div>
      </section>
      {isLink == false && <Link user={user} userLink={userLink} />}
    </div>
  );
};

export default Main;
