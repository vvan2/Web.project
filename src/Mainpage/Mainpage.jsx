import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';

function MainPage() {
  const navigate = useNavigate();

  // 문자 제목, 내용, 수신번호, 이미지 및 수신자 목록을 위한 상태
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [image, setImage] = useState(null);

  // 수신번호 추가 함수
  const handleAddRecipient = () => {
    if (recipientNumber && !recipients.includes(recipientNumber)) {
      setRecipients([...recipients, recipientNumber]);
      setRecipientNumber('');
    }
  };

  // 문자 발송 함수 (서버로 데이터 전송)
  const handleSendMessage = () => {
    const messageData = {
      title: messageTitle,
      content: messageContent,
      image: image,
      recipients: recipients,
    };
    console.log('메시지 데이터:', JSON.stringify(messageData));
    // 여기에서 서버로 POST 요청을 보내는 코드를 추가합니다.
  };

  // 이미지 추가 함수 (추후 파일 업로드 로직 추가 가능)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <>
      {/* 상단 메뉴바 */}
      <div className="main-container">
        <div className="header">
          <button onClick={() => navigate('/')}>BluePrint</button>
          <div className="user-options">
            <span>회원이름</span>
            <span>로그아웃</span>
            <span onClick={() => navigate('/Mypage')}>마이페이지</span>
          </div>
        </div>
      </div>

      {/* 섹션을 가로로 배치 */}
      <div className="horizontal-sections">
        {/* 메시지 입력 섹션 */}
        <div className="message-input-section">
          <div className="message-input">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>메시지 입력</div>
            <button onClick={() => navigate('/ai-generate')} className="ai-generate-button">AI 자동 생성</button>
        </div>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
            />
            <textarea
              placeholder="내용을 입력해주세요"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </div>

          {/* 이미지 또는 GIF 추가 섹션 */}
          <div className="image-gif-upload">
            <div>이미지 or GIF 추가</div>
            <input type="file" onChange={handleImageUpload} />
            {image && <div>이미지 미리보기: {image.name}</div>}
          </div>

          
        </div>

        {/* 미리보기 섹션 */}
        <div className="preview-section">
          <div>미리보기</div>
          <textarea placeholder="문자" readOnly></textarea>
          <textarea placeholder="카카오톡" readOnly></textarea>
        </div>

        {/* 발송 섹션 */}
        <div className="send-section">
          <div>수신번호 입력</div>
          <input
            type="text"
            placeholder="수신번호 입력"
            value={recipientNumber}
            onChange={(e) => setRecipientNumber(e.target.value)}
          />
          <button onClick={handleAddRecipient}>번호 추가</button>
          <div>받는 사람</div>
          <textarea readOnly value={recipients.join('\n')}></textarea>
          <button onClick={handleSendMessage}>발송하기</button>
        </div>
      </div>
    </>
  );
}

export default MainPage;
