// import React, { useState } from 'react';
// import './Aimessagepopup.css';

// function AiMessagePopup({ closePopup, setAiMessage }) {
//   const [purposeContent, setPurposeContent] = useState('');
//   const [keywords, setKeywords] = useState('');
//   const [generatedMessage, setGeneratedMessage] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);

//   // 발송목적 및 내용 텍스트필드 변경 시 히든 텍스트 제거
//   const handlePurposeChange = (e) => {
//     setPurposeContent(e.target.value);
//   };

//   // 주요 키워드 텍스트필드 변경 시 히든 텍스트 제거
//   const handleKeywordsChange = (e) => {
//     setKeywords(e.target.value);
//   };

//   // 서버로 POST 요청 (문자 생성)
//   const handleGenerateMessage = () => {
//     if (!purposeContent || !keywords) {
//       alert('발송목적 및 주요 키워드를 입력해 주세요.');
//       return;
//     }

//     setIsGenerating(true);

//     const requestData = {
//       purpose: purposeContent,
//       keywords: keywords
//     };

//     // 여기에 서버와의 POST 요청 코드를 추가합니다.
//     fetch('/api/generate-message', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(requestData)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setGeneratedMessage(data.generatedMessage); // 서버로부터 받은 응답을 텍스트에어리어에 표시
//         setIsGenerating(false);
//       })
//       .catch((error) => {
//         console.error('Error generating message:', error);
//         setIsGenerating(false);
//       });
//   };

//   // 다시 생성 버튼 클릭 시 새로운 요청을 보냄
//   const handleRegenerateMessage = () => {
//     handleGenerateMessage(); // 동일한 요청 재실행
//   };

//   // 문자 사용하기 버튼 클릭 시 생성된 메시지를 MainPage로 전달하고 팝업 닫기
//   const handleUseMessage = () => {
//     setAiMessage(generatedMessage); // 생성된 메시지를 부모 컴포넌트에 전달
//     closePopup();
//   };

//   return (
//     <div className="popup-container">
//       <div className="popup-header">
//         <span onClick={() => closePopup()}>X 닫기</span>
//         <span>AI 문자 생성</span>
//         <span onClick={() => navigate('/ai-image')}>AI 이미지 생성</span>
//       </div>

//       <div className="popup-content">
//         {/* 발송목적 및 내용 입력 필드 */}
//         <div className="input-section">
//           <label>발송목적 및 내용</label>
//           <textarea
//             value={purposeContent}
//             onChange={handlePurposeChange}
//             placeholder="예시: 새로운 제품 홍보"
//           />
//         </div>

//         {/* 주요 키워드 입력 필드 */}
//         <div className="input-section">
//           <label>주요 키워드</label>
//           <textarea
//             value={keywords}
//             onChange={handleKeywordsChange}
//             placeholder="예시: 할인, 신제품, 빠른 배송"
//           />
//         </div>

//         {/* 문자 생성 및 다시 생성 버튼 */}
//         <button onClick={handleGenerateMessage} disabled={isGenerating}>
//           {isGenerating ? '문자 생성 중...' : '문자 생성'}
//         </button>
//         <button onClick={handleRegenerateMessage} disabled={!generatedMessage}>
//           다시 생성
//         </button>

//         {/* 생성된 결과 텍스트에어리어 */}
//         <div className="result-section">
//           <label>생성 결과</label>
//           <textarea
//             value={generatedMessage}
//             readOnly
//             placeholder="여기에 생성된 결과가 표시됩니다."
//           />
//         </div>

//         {/* 생성된 문자를 사용하기 버튼 */}
//         <button onClick={handleUseMessage} disabled={!generatedMessage}>
//           이 문자 사용하기
//         </button>

//         {/* 문자만 보낼래요 버튼 */}
//         <button onClick={closePopup}>문자만 보낼래요</button>
//       </div>
//     </div>
//   );
// }

// export default AiMessagePopup;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // useNavigate 임포트
// import './Aimessagepopup.css';

// function AiMessagePopup({ closePopup }) {
//   const [purposeContent, setPurposeContent] = useState('');
//   const [keywords, setKeywords] = useState('');
//   const navigate = useNavigate();  // navigate 함수 정의

//   // 발송목적 및 내용 텍스트 필드 변경 함수
//   const handlePurposeChange = (e) => {
//     setPurposeContent(e.target.value);
//   };

//   // 주요 키워드 텍스트 필드 변경 함수
//   const handleKeywordsChange = (e) => {
//     setKeywords(e.target.value);
//   };

//   // 팝업 닫기 함수
//   const handleClose = () => {
//     closePopup();
//   };

//   return (
//     <div className="popup-container">
//       <div className="popup-header">
//         <span onClick={handleClose}>X</span>
//         <span>AI 문자 생성</span>
//         <span onClick={() => navigate('/ai-image')}>AI 이미지 생성</span>
//       </div>
//       <div className="popup-content">
//         {/* 발송목적 및 내용 입력 */}
//         <label>발송목적 및 내용</label>
//         <textarea
//           value={purposeContent}
//           onChange={handlePurposeChange}
//           placeholder="발송목적 및 내용을 입력하세요"
//         />

//         {/* 주요 키워드 입력 */}
//         <label>주요 키워드</label>
//         <textarea
//           value={keywords}
//           onChange={handleKeywordsChange}
//           placeholder="주요 키워드를 입력하세요"
//         />

//         <button onClick={handleClose}>문자 사용하기</button>
//       </div>
//     </div>
//   );
// }

// export default AiMessagePopup;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트
import './Aimessagepopup.css';

function AiMessagePopup({ closePopup, setAiMessage }) {
  const [purposeContent, setPurposeContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const navigate = useNavigate();  // navigate 함수 정의

  // 발송목적 및 내용 텍스트필드 변경 시 히든 텍스트 제거
  const handlePurposeChange = (e) => {
    setPurposeContent(e.target.value);
  };

  // 주요 키워드 텍스트필드 변경 시 히든 텍스트 제거
  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
  };

  // 서버로 POST 요청 (문자 생성)
  const handleGenerateMessage = () => {
    if (!purposeContent || !keywords) {
      alert('발송목적 및 주요 키워드를 입력해 주세요.');
      return;
    }

    setIsGenerating(true);

    const requestData = {
      purpose: purposeContent,
      keywords: keywords
    };

    // 여기에 서버와의 POST 요청 코드를 추가합니다.
    fetch('/api/generate-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((data) => {
        setGeneratedMessage(data.generatedMessage); // 서버로부터 받은 응답을 텍스트에어리어에 표시
        setIsGenerating(false);
      })
      .catch((error) => {
        console.error('Error generating message:', error);
        setIsGenerating(false);
      });
  };

  // 다시 생성 버튼 클릭 시 새로운 요청을 보냄
  const handleRegenerateMessage = () => {
    handleGenerateMessage(); // 동일한 요청 재실행
  };

  // 문자 사용하기 버튼 클릭 시 생성된 메시지를 MainPage로 전달하고 팝업 닫기
  const handleUseMessage = () => {
    setAiMessage(generatedMessage); // 생성된 메시지를 부모 컴포넌트에 전달
    closePopup();
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <span onClick={() => closePopup()}>X 닫기</span>
        <span>AI 문자 생성</span>
        <span onClick={() => navigate('/ai-image')}>AI 이미지 생성</span>
      </div>

      <div className="popup-content">
        {/* 발송목적 및 내용 입력 필드 */}
        <div className="input-section">
          <label>발송목적 및 내용</label>
          <textarea
            value={purposeContent}
            onChange={handlePurposeChange}
            placeholder="예시: 새로운 제품 홍보"
          />
        </div>

        {/* 주요 키워드 입력 필드 */}
        <div className="input-section">
          <label>주요 키워드</label>
          <textarea
            value={keywords}
            onChange={handleKeywordsChange}
            placeholder="예시: 할인, 신제품, 빠른 배송"
          />
        </div>

        {/* 문자 생성 및 다시 생성 버튼 */}
        <button onClick={handleGenerateMessage} disabled={isGenerating}>
          {isGenerating ? '문자 생성 중...' : '문자 생성'}
        </button>
        <button onClick={handleRegenerateMessage} disabled={!generatedMessage}>
          다시 생성
        </button>

        {/* 생성된 결과 텍스트에어리어 */}
        <div className="result-section">
          <label>생성 결과</label>
          <textarea
            value={generatedMessage}
            readOnly
            placeholder="여기에 생성된 결과가 표시됩니다."
          />
        </div>

        {/* 생성된 문자를 사용하기 버튼 */}
        <button onClick={handleUseMessage} disabled={!generatedMessage}>
          이 문자 사용하기
        </button>

        {/* 문자만 보낼래요 버튼 */}
        <button onClick={closePopup}>문자만 보낼래요</button>
      </div>
    </div>
  );
}

export default AiMessagePopup;
