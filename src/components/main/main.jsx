import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../chat/chat";
import Header from "../header/header";
import Link from "../link/link";
import Video from "../video/video";
import VideoList from "../video_list/video_list";
import VideoStorage from "../video_storage/video_stroage";
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
  const [partner_menu, setPartner_menu] = useState();
  const [storageIndex, setStorageIndex] = useState();
  const [chatStorage, setChatStorage] = useState();
  const [videoStorage, setVideoStorage] = useState();
  const [xActive, setXActive] = useState();
  const navigate = useNavigate();

  const signOut = () => {
    kakaoService.signOut();
    window.localStorage.removeItem("token");
    setToken();
  };

  const goHome = () => {
    navigate("/");
  };

  const sendMsg = (msg) => {
    if (!msg) return;
    const date = new Date();
    dbService.update(`/storage/${storageIndex}/chat/${date}`, {
      user: user.email,
      msg,
      date,
    });
  };

  const addURL = (url) => {
    if (!url) return;
    const subURL = url.split("be/")[1];
    if (!subURL) return;
    const date = new Date();
    youtube //
      .urlSearch(subURL)
      .then((res) => {
        dbService.update(`/storage/${storageIndex}/video/${date}`, {
          video: res,
          date: `${date}`,
        });
      })
      .catch((error) => console.log(error));
  };

  const delURL = (date) => {
    dbService.update(`/storage/${storageIndex}/video/${date}`, "");
  };

  const URLClick = (data) => {
    setSelectedVideo(data);
  };

  const kakaoMsg = () => {
    window.Kakao.Link.sendDefault({
      objectType: "text",
      text: `${user.name}님으로 부터 ugether 연결 요청을 받았습니다.`,
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

  const userLink = (value) => {
    if (value == user.email) return;
    dbService
      .read(`/users/${value}`)
      .then((res) => {
        dbService.update(`/users/${user.email}/partner`, value);
        setPEmail(value);
        dbService.observer(`/users/${value}/partner`, (data) => {
          if (user.email == data) {
            dbService.update(`/users/${user.email}/isLink`, true);
            setIsLink(true);
          }
        });
      })
      .catch((error) => alert("Wrong code!"));
    setStorageIndex(-1);
  };

  const unlink = () => {
    setIsLink(false);
    dbService.update(`users/${user.email}/isLink`, false);
    setPartner();
    setPEmail();
  };

  const search = (keyword) => {
    if (!keyword) return;
    youtube.search(keyword).then((res) => setVideos(res));
  };

  const searchActiveHandle = (value) => {
    if (value) setXActive(true);
    else setXActive(false);
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
    youtube.mostPopular().then((res) => setVideos(res));
  }, []);

  useEffect(() => {
    if (!user) return;
    dbService //
      .read(`/users/${user.email}`)
      .then((res) => {
        setIsLink(res.isLink);
        setPEmail(res.partner);
        setStorageIndex(res.storageIndex);
        dbService.update(`/users/${user.email}/isOnline`, true);
      })
      .catch((error) => {
        dbService //
          .update(`/users/${user.email}`, {
            email: user.email,
            name: user.name,
            image: user.image,
            img: user.img,
            partner: "",
            isOnline: false,
            isLink: false,
            storageIndex: false,
          })
          .then(() => {
            setIsLink(false);
            setPEmail("");
            setStorageIndex(-1);
            dbService.update(`/users/${user.email}/isOnline`, true);
          });
      });

    return () => {
      dbService.update(`/users/${user.email}/isOnline`, false);
    };
  }, [user]);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);

  useEffect(() => {
    if (!pEmail) return;
    dbService.observer(`/users/${pEmail}`, (data) => {
      setPartner(data);
    });
  }, [pEmail]);

  useEffect(() => {
    if (!isLink) return;
  }, [isLink]);

  useEffect(() => {
    if (storageIndex === false) return;
    if (!partner) return;
    if (
      !(partner.storageIndex === false) &&
      storageIndex > partner.storageIndex
    ) {
      setStorageIndex(partner.storageIndex);
      dbService.update(
        `/users/${user.email}/storageIndex`,
        partner.storageIndex
      );
    }
    if (storageIndex == -1) {
      dbService //
        .read(`storage`)
        .then((res) => {
          setStorageIndex(res.length);
          dbService.update(`/storage/${res.length}/chat`, "");
          dbService.update(`/storage/${res.length}/video`, "");
          dbService.update(`/users/${user.email}/storageIndex`, res.length);
        })
        .catch((error) => {
          setStorageIndex(1);
          dbService.update(`/storage/1/chat`, "");
          dbService.update(`/storage/1/video`, "");
          dbService.update(`/users/${user.email}/storageIndex`, 1);
        });
    } else {
      dbService
        .read(`storage/${storageIndex}`)
        .then(() => {
          dbService.update(`/users/${user.email}/storageIndex`, storageIndex);
          dbService.observer(`/storage/${storageIndex}/chat`, (data) => {
            setChatStorage([...Object.values(data)]);
          });
          dbService.observer(`/storage/${storageIndex}/video`, (data) => {
            setVideoStorage([...Object.values(data)]);
          });
        })
        .catch((error) => {
          dbService.update(`/users/${user.email}/storageIndex`, storageIndex);
          dbService.update(`/storage/${storageIndex}/chat`, "");
          dbService.update(`/storage/${storageIndex}/video`, "");
        })
        .then(() => {
          dbService.observer(`/storage/${storageIndex}/chat`, (data) => {
            setChatStorage([...Object.values(data)]);
          });
          dbService.observer(`/storage/${storageIndex}/video`, (data) => {
            setVideoStorage([...Object.values(data)]);
          });
        });
    }
  }, [storageIndex, partner]);

  return (
    <div className={styles.main}>
      <Header
        user={user}
        partner={partner}
        user_menu={user_menu}
        partner_menu={partner_menu}
        xActive={xActive}
        setUser_menu={setUser_menu}
        setPartner_menu={setPartner_menu}
        signOut={signOut}
        kakaoMsg={kakaoMsg}
        unlink={unlink}
        search={search}
        searchActiveHandle={searchActiveHandle}
        goHome={goHome}
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
        {user && (
          <div className={styles.communication}>
            <VideoStorage
              videoStorage={videoStorage}
              addURL={addURL}
              delURL={delURL}
              URLClick={URLClick}
            />
            <Chat //
              user={user}
              chatStorage={chatStorage}
              sendMsg={sendMsg}
            />
          </div>
        )}
      </section>
      {isLink == false && <Link user={user} userLink={userLink} />}
    </div>
  );
};

export default Main;
