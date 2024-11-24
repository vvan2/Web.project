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
  });
  const [rememberId, setRememberId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필드 검증: 비어 있는 필드를 확인
    const emptyFields = [];
    if (!form.name) emptyFields.push('이름');
    if (!form.phone) emptyFields.push('전화번호');
    if (!form.username) emptyFields.push('아이디');
    if (!form.password) emptyFields.push('비밀번호');
    if (!form.confirmPassword) emptyFields.push('비밀번호 확인');

    // 비어 있는 필드가 있는 경우 알림
    if (emptyFields.length > 0) {
      alert(`${emptyFields.join(', ')}(이)가 비어있습니다. 모두 입력해주세요.`);
      return;
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 서로 일치하지 않습니다.');
      return;
    }

    // 회원가입 API 호출
    try {
      const response = await fetch('http://13.239.36.154:8080/api/joinProc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          name: form.name,
          phoneNumber: form.phone
        }),
      });

      if (!response.ok) {
        throw new Error('회원가입에 실패했습니다.'); // 서버 응답이 200이 아닐 경우 예외 발생
      }

      const data = await response.json();
      console.log('회원가입 성공:', data);
      
      // 회원가입 성공 후 다른 페이지로 이동
      navigate('/Login');
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'); // 오류 메시지 사용자에게 표시
    }
  };

  return (
    <div>
      <div className="main-container">
        <div className="header">
        <span 
            onClick={() => navigate('/')} 
            style={{  fontWeight: 'bold', fontSize: '30px', cursor: 'pointer' }}
          >
            BluePrint
          </span>
          <div className="user-options">
            <span onClick={() => navigate('/Login')}>로그인</span>
            <span onClick={() => navigate('/Mypage')}>마이페이지</span>
          </div>
        </div>
      </div>

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

          <button type="submit" className="join-btn">회원가입</button>
        </form>
      </div>
    </div>
  );
};

export default Join;
