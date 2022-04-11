import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Kakao from './service/kakao';
import Database from './service/database';
import { database } from './service/firebase';
import Youtube from './service/youtube';

const kakaoService = new Kakao();
const dbService = new Database(database);
const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App kakaoService={kakaoService} dbService={dbService} youtube={youtube}/>
  </React.StrictMode>,
  document.getElementById('root')
);
