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
    address: '',
    pw: '',
    newPw: '',
    confirmNewPw: ''
  });
  const [name, setName] = useState(''); // 사용자 이름 상태로 변경

  // 사용자 정보를 세션 스토리지에서 가져오기
  useEffect(() => {
    const storedName = sessionStorage.getItem('name'); // 'username' 대신 'name' 사용
    if (storedName) {
      setName(storedName);
      // 서버에서 사용자 정보 가져오기 (필요시)
      fetch('/api/userinfo') // 사용자 정보를 제공하는 API 엔드포인트
        .then((response) => response.json())
        .then((data) => {
          setUserInfo({
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            pw: '',
            newPw: '',
            confirmNewPw: ''
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
      sessionStorage.removeItem('name'); // 세션 스토리지에서 사용자 정보 삭제
      setName(''); // 상태 업데이트
      navigate('/'); // 홈으로 이동
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // 입력 값 변경 시 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  // 회원 탈퇴 처리
  const handleWithdraw = () => {
    if (userInfo.pw !== userInfo.confirmNewPw) {
      alert("입력한 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    fetch('/api/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: userInfo.pw,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('회원 탈퇴가 성공적으로 완료되었습니다.');
          navigate('/');  // 성공 시 홈으로 이동
        } else {
          alert('회원 탈퇴에 실패했습니다.');
        }
      })
      .catch((error) => console.error('Error withdrawing account:', error));
  };

  return (
    <div className="mypage-container">
      {/* 상단 헤더 */}
      <div className="header">
        <button onClick={() => navigate('/')}>BluePrint</button>
        <div className="user-options">
          {name ? ( // 'username' 대신 'name' 사용
            <>
              <span>{name}</span> {/* 로그인 상태에서 사용자 이름 표시 */}
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
        <span onClick={() => navigate('/Mypage')}>회원정보변경</span>
        <span onClick={() => navigate('/Mypage_pw')}>비밀번호변경</span>
        <span onClick={() => navigate('/Mypage_letter')}>발송내역</span>
        <span onClick={() => navigate('/Mypage_storage')}>보관함</span>
        <span className="active" onClick={() => navigate('/Mypage_withdraw')}>회원 탈퇴</span> {/* 여기에 active 적용 */}
      </div>

      {/* 회원 탈퇴 폼 */}
      <div className="info-section">
        <div className="info-items">
          <div>비밀번호</div>
          <input
            type="password"
            name="pw"
            value={userInfo.pw}
            onChange={handleChange}
            placeholder="비밀번호 입력"
          />
        </div>

        <div className="info-items">
          <div>비밀번호 확인</div>
          <input
            type="password"
            name="confirmNewPw"
            value={userInfo.confirmNewPw}
            onChange={handleChange}
            placeholder="비밀번호 확인 입력"
          />
        </div>

        {/* 회원 탈퇴 버튼 */}
        <div className="info-item1">
          <button onClick={handleWithdraw}>회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
}

export default MypageMemberInfo;
