import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css'; // 필요한 스타일 적용

function MypageMemberInfo() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  // 서버에서 사용자 정보 가져오기
  useEffect(() => {
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
  }, []);

  return (
    <div className="mypage-container">
      {/* 상단 헤더 */}
      <div className="header">
        <button onClick={() => navigate('/')}>BluePrint</button>
        <div className="user-options">
          <span>{userInfo.name}</span>
          <span onClick={() => navigate('/logout')}>로그아웃</span>
          <span onClick={() => navigate('/mypage')}>마이페이지</span>
        </div>
      </div>

      {/* 메뉴 탭 */}
      <div className="tab-menu">
        <span className="active" onClick={() => navigate('/mypage/member-info')}>회원정보변경</span>
        <span onClick={() => navigate('/mypage/change-password')}>비밀번호변경</span>
        <span onClick={() => navigate('/mypage/send-history')}>발송내역</span>
        <span onClick={() => navigate('/mypage/storage')}>보관함</span>
        <span onClick={() => navigate('/mypage/withdraw')}>회원 탈퇴</span>
      </div>

      {/* 회원정보 표시 */}
      <div className="info-section">
        <div className="info-item">
          <div>아이디</div>
          <div>{userInfo.id}</div>
        </div>

        <div className="info-item">
          <div>이름</div>
          <div>{userInfo.name}</div>
          <button onClick={() => navigate('/mypage/change-name')}>이름 변경</button>
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
