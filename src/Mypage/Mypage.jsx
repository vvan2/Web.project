import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css';

function MypageMemberInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [username, setUsername] = useState(''); // 사용자 이름 상태

  // 사용자 정보 가져오기
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);

      // 서버에서 사용자 정보 가져오기
      fetch('/api/userinfo') // 사용자 정보를 제공하는 API 엔드포인트
        .then((response) => response.json())
        .then((data) => {
          setUserInfo({
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address
          });
        })
        .catch((error) => console.error('Error fetching user info:', error));
    }
  }, []);

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      sessionStorage.removeItem('username'); // 세션 스토리지에서 사용자 정보 삭제
      setUsername(''); // 상태 업데이트
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="mypage-container">
      {/* 상단 헤더 */}
      <div className="header">
        <button onClick={() => navigate('/')}>BluePrint</button>
        <div className="user-options">
          {username ? (
            <>
              <span>{username}</span> {/* 로그인 상태에서 사용자 이름 표시 */}
              <span onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '10px' }}>로그아웃</span> {/* 로그아웃 버튼 */}
            </>
          ) : (
            <span onClick={() => navigate('/Login')} style={{ cursor: 'pointer' }}>로그인</span>
          )}
          <span onClick={() => navigate('/Mypage')} style={{ cursor: 'pointer', marginLeft: '10px' }}>마이페이지</span>
        </div>
      </div>

      {/* 메뉴 탭 */}
      <div className="tab-menu">
        <span className="active" onClick={() => navigate('/Mypage')}>회원정보변경</span>
        <span onClick={() => navigate('/Mypage_pw')}>비밀번호변경</span>
        <span onClick={() => navigate('/Mypage_letter')}>발송내역</span>
        <span onClick={() => navigate('/Mypage_storage')}>보관함</span>
        <span onClick={() => navigate('/Mypage_withdraw')}>회원 탈퇴</span>
      </div>

      {/* 회원정보 표시 */}
      <div className="info-section">
        <div className="info-item">
          <div>아이디</div>
          <div style={{ marginRight: '100px' }}>{userInfo.id}</div>
          <div></div>
        </div>

        <div className="info-item">
          <div>이름</div>
          <div style={{ marginRight: '80px' }}>{userInfo.name}</div>
          <div></div>
        </div>

        <div className="info-item">
          <div>전화번호</div>
          <div>{userInfo.phone}</div>
          <button onClick={() => navigate('/mypage/change-phone')}>전화번호 변경</button>
        </div>

        <div className="info-item">
          <div>이메일</div>
          <div>{userInfo.email}</div>
          <button onClick={() => navigate('/mypage/change-email')}>이메일 변경</button>
        </div>

        <div className="info-item">
          <div>주소</div>
          <div>{userInfo.address}</div>
          <button onClick={() => navigate('/mypage/change-address')}>주소 변경</button>
        </div>
      </div>
    </div>
  );
}

export default MypageMemberInfo;
