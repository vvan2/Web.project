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

  // 더미 데이터 추가
  useEffect(() => {
    // 주석 처리된 부분을 다음과 같이 더미 데이터로 대체
    const dummyData = [
      {
        date: '2024-10-01',
        type: '일반 메시지',
        count: 10,
        title: '인사드립니다',
        content: '안녕하세요, 잘 지내고 계신가요?'
      },
      {
        date: '2024-10-02',
        type: '프로모션',
        count: 5,
        title: '할인 이벤트',
        content: '10% 할인 이벤트를 놓치지 마세요!'
      },
      {
        date: '2024-10-03',
        type: '알림',
        count: 3,
        title: '예약 확인',
        content: '예약이 완료되었습니다. 확인해 주세요.'
      },
      {
        date: '2024-10-04',
        type: '정기 메시지',
        count: 8,
        title: '주간 뉴스레터',
        content: '이번 주의 소식을 전해드립니다.'
      },
      {
        date: '2024-10-05',
        type: '긴급 메시지',
        count: 2,
        title: '중요 공지',
        content: '서버 점검이 예정되어 있습니다.'
      }
    ];
    setMessageHistory(dummyData); // 더미 데이터를 설정합니다.
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
