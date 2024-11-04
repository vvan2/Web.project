import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 처리
        console.log('Login successful:', data);
        
        // 세션 스토리지에 사용자 정보를 저장
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('name', data.name);
        sessionStorage.setItem('phoneNumber', data.phoneNumber);
        sessionStorage.setItem('message', data.message);

        // rememberMe가 true인 경우 로컬 스토리지에 사용자 정보를 저장
        if (rememberMe) {
          localStorage.setItem('username', data.username);
        } else {
          localStorage.removeItem('username');
        }

        navigate('/'); // 메인 페이지로 이동
      } else {
        // 로그인 실패 처리
        setErrorMessage(data.message || 'Invalid username or password');
      }
    } catch (error) {
      // 서버와의 통신에서 오류가 발생했을 때
      setErrorMessage('An error occurred during login: ' + error.message);
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/Join');
  };

  const clearInput = (setFunc) => {
    setFunc('');
  };

  return (
    <div>
      <div className="main-container">
        <div className="header">
          <button onClick={() => navigate('/')}>BluePrint</button>
          <div className="user-options">
            <span onClick={() => navigate('/Login')}>로그인</span>
            <span onClick={() => navigate('/Mypage')}>마이페이지</span>
          </div>
        </div>
      </div>

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

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <button type="button" className="register-btn" onClick={handleRegister}>회원가입</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
