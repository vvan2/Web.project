import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mainpage.css';
import AiMessagePopup from '../Aimessagepopup/Aimessagepopup';

function MainPage() {
  const navigate = useNavigate();

  // 문자 제목, 내용, 수신번호, 이미지 및 수신자 목록을 위한 상태
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [recipientNumber, setRecipientNumber] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // 미리보기 선택 상태
  const [previewType, setPreviewType] = useState('문자'); // 기본값은 문자

  // 팝업 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 사용자 정보 상태
  const [name, setName] = useState(''); // name으로 수정

  useEffect(() => {
    // 세션 스토리지에서 사용자 정보를 가져오기
    const storedName = sessionStorage.getItem('name'); // name으로 수정
    if (storedName) {
      setName(storedName);
    }
  }, []);

  useEffect(() => {
    // 상단바 배경색 설정
    const headerElement = document.querySelector('.header');
    if (headerElement) {
      // headerElement.style.backgroundColor = '#d3e3fd'; // 원하는 상단바 배경색
      headerElement.style.color = 'black'; // 텍스트 색상 설정
    }
    // body 배경색 설정
    document.body.style.backgroundColor = "#d3e3fd"; // 배경색 설정
    
    return () => {
      // 컴포넌트 언마운트 시 초기화
      if (headerElement) {
        headerElement.style.backgroundColor = '';
      }
      document.body.style.backgroundColor = ""; // 컴포넌트 언마운트 시 초기화
    };
  }, []);


  // 수신번호 입력 변경 핸들러 (숫자만 입력 가능)
const handleRecipientNumberChange = (e) => {
  const input = e.target.value;
  // 숫자인지 확인하고 상태 업데이트
  if (/^\d*$/.test(input)) { // 정규식을 사용해 숫자만 허용
    setRecipientNumber(input);
  }
};

// 수신번호 추가 함수
const handleAddRecipient = () => {
  // 유효성 검사: 숫자만, 11자리인지 확인
  if (recipientNumber.length !== 11) {
    alert('전화번호는 정확히 11자리여야 합니다.');
    return;
  }
  if (recipients.includes(recipientNumber)) {
    alert('이미 추가된 번호입니다.');
    return;
  }

  setRecipients([...recipients, recipientNumber]);
  setRecipientNumber(''); // 입력 필드 초기화
};


  const setAiMessage = (aiMessage) => {
    setMessageContent(aiMessage.purposeContent);
    
    if (typeof aiMessage.selectedImage === 'string') {
      // URL 형태로 받은 이미지일 때 처리
      setImageURL(aiMessage.selectedImage);
      setImage(null); // 파일 객체 초기화
    } else {
      // 파일 객체일 때 처리
      setImage(aiMessage.selectedImage);
      setImageURL(null);
    }
    
    closePopup();
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
    setImage(file); // 파일 객체를 상태로 저장
    setImageURL(null); // URL 초기화
  };

  // 팝업 열기 함수
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 닫기 함수
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // 라디오 버튼 선택에 따라 미리보기 이미지 변경
  const handlePreviewChange = (e) => {
    setPreviewType(e.target.value);
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출 (예: POST 요청)
      await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // 세션 스토리지의 모든 정보 삭제
      sessionStorage.clear();
  
      // 상태 초기화
      setName(''); 
  
      // 로그인 페이지로 이동
      navigate('/Login'); // 필요한 경우 리다이렉션 추가
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  

  // 수신번호 수정 함수
    const handleRecipientEdit = (index, newValue) => {
      const updatedRecipients = [...recipients];
      updatedRecipients[index] = newValue; // 선택한 인덱스의 값을 업데이트
      setRecipients(updatedRecipients);
    };

    // 수신번호 삭제 함수
    const handleRemoveRecipient = (index) => {
      const updatedRecipients = recipients.filter((_, i) => i !== index); // 선택한 인덱스를 제외
      setRecipients(updatedRecipients);
    };


  return (
    <>
      {/* 상단 메뉴바 */}
      <div className="main-container">
        <div className="header">
        <span 
          onClick={() => navigate('/')} 
          style={{  fontWeight: 'bold', fontSize: '30px', cursor: 'pointer' }}
        >
          BluePrint
        </span>
          <div className="user-options">
            {name ? ( // username 대신 name으로 수정
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
      </div>

      {/* <div className="basic-section">
        <p>문자</p>
      </div>

      <div className="sub-container">
        <span>일반문자</span>
        <span>광고문자</span>
        <span>광고이용안내</span>
      </div>

      <div className="notice-section">
        <p>90byte 초과 시, 장문으로 전환됩니다. 최대 2,000byte까지 작성이 가능합니다.</p>
        <p>이미지 추가 시, 포토 문자로 전환됩니다. 이미지 최대 3장(권장 사이즈 640x960) + 2,000byte까지 작성이 가능합니다.</p>
        <p>광고성 문자는 [광고문자]에서 발송해주세요. 080번호를 무료로 제공합니다.</p>
        <p>문자 발송 시 [씨앗 {'>'} 충전금 {'>'} 포인트] 순서로 사용됩니다.</p>
      </div> */}
      {/* 섹션을 가로로 배치 */}
      <div className="horizontal-sections">
        {/* 메시지 입력 섹션 */}
        <div className="message-input-section">
          <div className="message-input">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ marginRight: '10px' }}>메시지 입력</div>
              <button style={{ marginRight: '10px' }} onClick={openPopup} className="ai-generate-button">AI 자동 생성</button>
            </div>
            <input
              type="text"
              placeholder="제목을 입력해주세요 (발송 관리용)"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
            />
            <textarea
              style={{ width: '97%' }}
              placeholder="내용을 입력해주세요"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
          </div>

          <br></br><br></br>
          {/* 이미지 또는 GIF 추가 섹션 */}
          <div className="image-gif-upload">
            <div>이미지 or GIF 추가</div>
            
            {/* 이미지 미리보기: image 상태가 있을 때만 표시 */}
            {image && (
              <div className="image-preview">
                <br></br>
                <img src={URL.createObjectURL(image)} alt="미리보기 이미지" style={{ maxWidth: '50%', height: 'auto', marginBottom: '10px' }} />
              </div>
            )}
            
            <input type="file" onChange={handleImageUpload} />
          </div>

        </div>

        {/* 미리보기 섹션 */}
        <div className="preview-section">
          <div>미리보기</div>
          <div className="preview-options">
            <label>
              <input
                type="radio"
                value="문자"
                checked={previewType === '문자'}
                onChange={handlePreviewChange}
              />
              문자
            </label>
            <label>
              <input
                type="radio"
                value="카카오톡"
                checked={previewType === '카카오톡'}
                onChange={handlePreviewChange}
              />
              카카오톡
            </label>
          </div>
          <div className="preview-message">
            {previewType === '문자' ? (
              <div className="message-preview">
                <div className="message-header">{messageContent.split('\n')[0]}</div>
                <div className="message-body">
                  {image && (
                    <img src={URL.createObjectURL(image)} alt="미리보기 이미지" className="message-image" />
                  )}
                
                </div>
                <div className="message-footer">[Web발신]<br></br> {messageContent} <p>{imageURL}</p></div>
              </div>
            ) : (
              <div className="kakao-preview">
                <div className="kakao-header">{messageContent.split('\n')[0]}</div>
                <div className="kakao-body">
                  {image && (
                    <img src={URL.createObjectURL(image)} alt="미리보기 이미지" className="message-image" />
                  )}
                
                </div>
                <div className="kakao-footer">[Web발신]<br></br> {messageContent} <p>{imageURL}</p> </div>
              </div>
            )}
          </div>
        </div>

        {/* 발송 섹션 */}
        <div className="send-section">
          <div>수신번호 입력</div>
          <input
            type="text"
            placeholder="수신번호 입력"
            value={recipientNumber}
            onChange={handleRecipientNumberChange} // 변경된 핸들러
          />
          <button style={{justifyContent: 'flex-end', marginRight:'15px'}} onClick={handleAddRecipient}>번호 추가</button>
          
          <br></br><br></br><br></br><br></br>
          <div>받는 사람</div>
          <br></br>
          {/* <textarea readOnly style={{width:'97%'}} value={recipients.join('\n')}></textarea> */}
          <div className="recipients-list">
            {recipients.map((recipient, index) => (
              <div key={index} className="recipient-item">
                <input
                  type="text"
                  value={recipient}
                />
                <button style={{marginTop:'30px', marginRight:'30px'}} onClick={() => handleRemoveRecipient(index)}>삭제</button>
              </div>
            ))}
          </div>

          <button style={{marginRight:'15px'}} onClick={handleSendMessage}>발송하기</button>
        </div>

      </div>

      {/* 팝업을 조건부 렌더링 */}
      {isPopupOpen && (
        <AiMessagePopup closePopup={closePopup} setAiMessage={setAiMessage} />
      )}
    </>
  );
}

export default MainPage;
