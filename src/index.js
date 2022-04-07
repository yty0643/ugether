import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Kakao from './service/kakao';
import Database from './service/database';
import { database } from './service/firebase';

const kakaoService = new Kakao();
const dbService = new Database(database);

ReactDOM.render(
  <React.StrictMode>
    <App kakaoService={kakaoService} dbService={dbService}/>
  </React.StrictMode>,
  document.getElementById('root')
);
