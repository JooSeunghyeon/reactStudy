import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App 컴포넌트를 가져옵니다.
import './styles.css'; // 스타일 파일 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 