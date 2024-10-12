import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Join.css';

const Join = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: ''
  });
  const [rememberId, setRememberId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 필드에 대한 상태

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
    console.log('회원가입 정보:', form);
    // 회원가입 성공 후 다른 페이지로 이동 (예: 메인 페이지)
    navigate('/Login');
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

      {/* 회원가입 폼 */}
      <div className="join-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit} className="join-form">
          <div className="input-group">
            <label>이름</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="이름" />
          </div>

          <div className="input-group">
            <label>전화번호</label>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="전화번호" />
          </div>

          <div className="input-group">
            <label>아이디</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="아이디" />
            <div className="checkbox-group">
              <input type="checkbox" checked={rememberId} onChange={() => setRememberId(!rememberId)} />
              <label>아이디 저장</label>
            </div>
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />
            <div className="checkbox-group">
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
              <label>비밀번호 보기</label>
            </div>
          </div>

          <div className="input-group">
            <label>비밀번호 확인</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />
            <div className="checkbox-group">
              <input type="checkbox" checked={showConfirmPassword} onChange={() => setShowConfirmPassword(!showConfirmPassword)} />
              <label>비밀번호 확인 보기</label>
            </div>
          </div>

          <div className="input-group">
            <label>이메일</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일" />
          </div>

          <div className="input-group">
            <label>주소</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="주소" />
          </div>

          <button type="submit" className="join-btn">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Join;
