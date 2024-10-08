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
    address: '서울'
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
          <span onClick={() => navigate('/Mypage')}>마이페이지</span>
        </div>
      </div>

      {/* 메뉴 탭 */}
      <div className="tab-menu">
        <span onClick={() => navigate('/Mypage')}>회원정보변경</span>
        <span onClick={() => navigate('/Mypage_pw')}>비밀번호변경</span> {/* 여기에 active 적용 */}
        <span onClick={() => navigate('/Mypage_letter')}>발송내역</span>
        <span onClick={() => navigate('/Mypage_storage')}>보관함</span>
        <span className="active" onClick={() => navigate('/Mypage_withdraw')}>회원 탈퇴</span>
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
