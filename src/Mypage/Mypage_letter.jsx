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

  const [messageHistory, setMessageHistory] = useState([]);

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
    
    // 발송 내역 가져오기
    fetch('/api/message-history') // 발송 내역을 제공하는 API 엔드포인트
      .then((response) => response.json())
      .then((data) => {
        setMessageHistory(data); // 서버에서 가져온 발송 내역 저장
      })
      .catch((error) => console.error('Error fetching message history:', error));
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
        <span onClick={() => navigate('/Mypage_pw')}>비밀번호변경</span>
        <span className="active" onClick={() => navigate('/Mypage_letter')}>발송내역</span>
        <span onClick={() => navigate('/Mypage_storage')}>보관함</span>
        <span onClick={() => navigate('/Mypage_withdraw')}>회원 탈퇴</span>
      </div>

      {/* 문자 발송 내역 */}
      <div className="info-section">
        <table>
          <thead>
            <tr>
              <th>발송일</th>
              <th>문자 종류</th>
              <th>발송건수</th>
              <th>문자 제목</th>
              <th>내용 보기</th>
            </tr>
          </thead>
          <tbody>
            {messageHistory.map((message, index) => (
              <tr key={index}>
                <td>{message.date}</td>
                <td>{message.type}</td>
                <td>{message.count}</td>
                <td>{message.title}</td>
                <td>
                  <button onClick={() => alert(message.content)}>문자 내용 보기</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MypageMemberInfo;
