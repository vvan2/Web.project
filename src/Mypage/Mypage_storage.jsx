import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage.css'; 

function MypageStorage() {
  const navigate = useNavigate();
  
  // 더미 데이터
  const messages = [
    { id: 1, title: '안녕하세요', content: '이것은 더미 메시지입니다.' },
    { id: 2, title: '할인 이벤트', content: '10% 할인 중입니다!' },
    { id: 3, title: '예약 확인', content: '예약이 완료되었습니다.' }
  ];

  const images = [
    { id: 1, src: 'image1.png', alt: '이미지 1' },
    { id: 2, src: 'image2.png', alt: '이미지 2' },
    { id: 3, src: 'image3.png', alt: '이미지 3' }
  ];

  const gifs = [
    { id: 1, src: 'gif1.gif', alt: 'GIF 1' },
    { id: 2, src: 'gif2.gif', alt: 'GIF 2' },
    { id: 3, src: 'gif3.gif', alt: 'GIF 3' }
  ];

  return (
    <div className="mypage-container">
      {/* 상단 헤더 */}
      <div className="header">
        <button onClick={() => navigate('/')}>BluePrint</button>
        <div className="user-options">
          <span>홍길동</span>
          <span onClick={() => navigate('/logout')}>로그아웃</span>
          <span onClick={() => navigate('/Mypage')}>마이페이지</span>
        </div>
      </div>

      {/* 메뉴 탭 */}
      <div className="tab-menu">
        <span onClick={() => navigate('/Mypage')}>회원정보변경</span>
        <span onClick={() => navigate('/Mypage_pw')}>비밀번호변경</span>
        <span onClick={() => navigate('/Mypage_letter')}>발송내역</span>
        <span className="active" onClick={() => navigate('/Mypage_storage')}>보관함</span>
        <span onClick={() => navigate('/Mypage_withdraw')}>회원 탈퇴</span>
      </div>

      {/* 가로로 나열된 섹션 */}
      <div className="info-section-container">
        {/* 내 문자 섹션 */}
        <div className="info-section">
          <h2>내 문자</h2>
          <div className="item-list">
            {messages.map((message) => (
              <div key={message.id} className="item">
                <h3>{message.title}</h3>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 내 이미지 섹션 */}
        <div className="info-section">
          <h2>내 이미지</h2>
          <div className="item-list">
            {images.map((image) => (
              <div key={image.id} className="item">
                <img src={image.src} alt={image.alt} style={{ width: '100px', height: '100px' }} />
              </div>
            ))}
          </div>
        </div>

        {/* 내 GIF 섹션 */}
        <div className="info-section">
          <h2>내 GIF</h2>
          <div className="item-list">
            {gifs.map((gif) => (
              <div key={gif.id} className="item">
                <img src={gif.src} alt={gif.alt} style={{ width: '100px', height: '100px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MypageStorage;
