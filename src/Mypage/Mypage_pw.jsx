import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css'; 

function MypageMemberInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: 'id1234',
    name: '홍길동',
    phone: '010-1111-2222',
    email: 'email@gmail.com',
    address: '서울',
    pw: '',
    newPw: '',
    confirmNewPw: ''
  });

  // 서버에서 사용자 정보 가져오기
  useEffect(() => {
    fetch('/api/userinfo') // 사용자 정보를 제공하는 API 엔드포인트
      .then((response) => response.json())
      .then((data) => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          id: data.id,
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address
        }));
      })
      .catch((error) => console.error('Error fetching user info:', error));
  }, []);

  // 입력 값 변경 시 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // 비밀번호 변경 처리
  const handlePasswordChange = () => {
    if (userInfo.newPw !== userInfo.confirmNewPw) {
      alert("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    // 비밀번호 변경 요청을 서버로 전송
    fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: userInfo.pw,
        newPassword: userInfo.newPw,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          navigate('/Mypage');  // 성공 시 마이페이지로 이동
        } else {
          alert('비밀번호 변경에 실패했습니다.');
        }
      })
      .catch((error) => console.error('Error changing password:', error));
  };

  return (
    <div className="mypage-container">
      {/* 상단 헤더 */}
      <div className="header">
        <button onClick={() => navigate('/')}>BluePrint</button>
        <div className="user-options">
          <span>{userInfo.name}</span>
          <span onClick={() => navigate('/logout')}>로그아웃</span>
          <span onClick={() => navigate('/Mypage')}>마이페이지</span>
        </div>
      </div>

      {/* 메뉴 탭 */}
      <div className="tab-menu">
        <span onClick={() => navigate('/Mypage')}>회원정보변경</span>
        <span className="active" onClick={() => navigate('/Mypage_pw')}>비밀번호변경</span> {/* 여기에 active 적용 */}
        <span onClick={() => navigate('/Mypage_letter')}>발송내역</span>
        <span onClick={() => navigate('/Mypage_storage')}>보관함</span>
        <span onClick={() => navigate('/Mypage_withdraw')}>회원 탈퇴</span>
      </div>

      {/* 비밀번호 변경 폼 */}
      <div className="info-section">
        <div className="info-items">
          <div>기존 비밀번호</div>
          <input
            type="password"
            name="pw"
            value={userInfo.pw}
            onChange={handleChange}
            placeholder="현재 비밀번호 입력"
          />
        </div>

        <div className="info-items">
          <div>새로운 비밀번호</div>
          <input
            type="password"
            name="newPw"
            value={userInfo.newPw}
            onChange={handleChange}
            placeholder="새로운 비밀번호 입력"
          />
        </div>

        <div className="info-items">
          <div>새로운 비밀번호 확인</div>
          <input
            type="password"
            name="confirmNewPw"
            value={userInfo.confirmNewPw}
            onChange={handleChange}
            placeholder="새로운 비밀번호 확인"
          />
        </div>

        {/* 비밀번호 변경 버튼 */}
        <div className="info-item1">
          <button onClick={handlePasswordChange}>비밀번호 변경</button>
        </div>
      </div>
    </div>
  );
}

export default MypageMemberInfo;
