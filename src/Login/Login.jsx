import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅 추가
import './Login.css'; // 스타일을 별도의 CSS 파일로 관리

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 추가할 수 있습니다.
    console.log('로그인 정보:', { username, password, rememberMe });
    
    // 로그인 성공 후 Mainpage로 이동
    navigate('/');
  };

  const handleRegister = () => {
    // 회원가입 버튼을 눌렀을 때 Join 페이지로 이동
    navigate('/Join');
  };

  const clearInput = (setFunc) => {
    setFunc('');
  };

  return (
    <div>
      {/* 상단 메뉴바 */}
      <div className="main-container">
        <div className="header">
          <button onClick={() => navigate('/')}>BluePrint</button>
          <div className="user-options">
            <span>회원이름</span>
            <span onClick={() => navigate('/Login')}>로그인</span>
            <span onClick={() => navigate('/Mypage')}>마이페이지</span>
          </div>
        </div>
      </div>

      {/* 로그인 폼 */}
      <div className="login-container">
        <h2>로그인</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="아이디" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            {username && <button type="button" className="clear-btn" onClick={() => clearInput(setUsername)}>X</button>}
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            {password && <button type="button" className="clear-btn" onClick={() => clearInput(setPassword)}>X</button>}
          </div>

          <div className="remember-me">
            <input 
              type="checkbox" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            />
            <label>아이디 저장</label>
          </div>

          <button type="submit" className="login-btn">로그인</button>
          <button type="button" className="register-btn" onClick={handleRegister}>회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
