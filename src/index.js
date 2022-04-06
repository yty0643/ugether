import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Kakao from './service/kakao';

const kakaoService = new Kakao();

ReactDOM.render(
  <React.StrictMode>
    <App kakaoService={kakaoService} />
  </React.StrictMode>,
  document.getElementById('root')
);
