import React, { useState } from 'react';
import './Aimessagepopup.css';

function AiMessagePopup({ closePopup, setAiMessage }) {
  const [purposeContent, setPurposeContent] = useState('');
  const [keywords, setKeywords] = useState('');
  const [organization, setOrganization] = useState('');
  const [mood, setMood] = useState('');
  const [situation, setSituation] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const [referenceImage, setReferenceImage] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  const handleFileChange = (e) => {
    setReferenceImage(e.target.files[0]);
  };

  const handleGenerateMessage = async () => {
    if (!purposeContent || !keywords) {
      alert('발송목적 및 주요 키워드를 입력해 주세요.');
      return;
    }

    setIsGenerating(true);

    const userInput = {
      userInputText: purposeContent,
      category: keywords,
    };

    try {
      const response = await fetch('http://localhost:8080/api/generate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });

      console.log("Response status:", response.status); // 응답 상태 코드 확인

      if (!response.ok) {
        throw new Error('문자 생성에 실패했습니다.');
      }

      const data = await response.json();
      // content 추출
      const generatedText = data.choices[0].message.content; // content 추출
      setGeneratedMessage(generatedText); // UI 업데이트
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateMessage = () => {
    handleGenerateMessage();
  };

  const handleUseMessage = () => {
    if (generatedMessage) {
      // AI 이미지 생성 탭으로 전환하고 내용 설정
      setActiveTab('image');
      setPurposeContent(generatedMessage); // 생성된 메시지를 목적 내용에 설정
    }
  };


  const handleGenerateImage = async () => {
    if (!purposeContent) {
      alert('문자 내용을 입력해 주세요.');
      return;
    }

    const imageDTO = {
      message: purposeContent, // 요청할 때 사용할 메시지
    };

    console.log("Sending image request with:", imageDTO); // 전송할 데이터 확인
    try {
      const response = await fetch('http://localhost:8080/api/createImage', { // API 경로에 맞게 수정
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageDTO),
      });

      console.log("Response status:", response.status); // 응답 상태 코드 확인


      if (!response.ok) {
        throw new Error('이미지 생성에 실패했습니다.');
      }

      const data = await response.json();
      const imageUrls = data.map(url => {
        const imageName = url.split('\\').pop(); // Windows 경로에서 파일 이름 추출
        return `http://localhost:8080/api/images/${imageName}`; // API 엔드포인트로 변경
      });

      setGeneratedImages(imageUrls); // 수정된 이미지 URL을 설정
    } catch (error) {
      alert(error.message);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSend = () => {
    if (selectedImage && purposeContent) {
      setAiMessage({ purposeContent, selectedImage });
      closePopup();
    } else {
      alert('문자 내용과 이미지를 선택해주세요.');
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <span onClick={() => closePopup()}>X 닫기</span>
        <span className={activeTab === 'text' ? 'active' : ''} onClick={() => setActiveTab('text')}>
          AI 문자 생성
        </span>
        <span className={activeTab === 'image' ? 'active' : ''} onClick={() => setActiveTab('image')}>
          AI 이미지 생성
        </span>
        <span className={activeTab === 'gif' ? 'active' : ''} onClick={() => setActiveTab('gif')}>
          AI gif 생성
        </span>
      </div>

      <div className="popup-content">
        {/* 문자 생성 탭 */}
        {activeTab === 'text' && (
          <div className="text-section">
            <div className="left-section">
              <div className="input-section">
                <label>발송 목적 및 내용</label>
                <textarea
                  value={purposeContent}
                  onChange={(e) => setPurposeContent(e.target.value)}
                  placeholder="예시: 결혼식 청첩장 발송"
                />
              </div>

              <div className="input-section">
                <label>주요 키워드</label>
                <textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="예시: 할인혜택, 신제품출시"
                />
              </div>

              <button onClick={handleGenerateMessage} disabled={isGenerating}>
                {isGenerating ? '문자 생성 중...' : '문자 생성'}
              </button>
              <button onClick={handleRegenerateMessage} disabled={!generatedMessage}>
                다시 생성
              </button>
            </div>

            <div className="right-section">
              <div className="result-section">
                <label>생성 결과</label>
                <textarea
                  value={generatedMessage}
                  readOnly
                  placeholder="여기에 생성된 결과가 표시됩니다."
                />
              </div>

              <button onClick={handleUseMessage} disabled={!generatedMessage}>
                이 문자 사용하기
              </button>
              <button onClick={() => { setAiMessage({ purposeContent: generatedMessage }); closePopup(); }}>
                문자만 보낼래요
              </button>
            </div>
          </div>
        )}

        {/* 이미지 생성 탭 */}
        {activeTab === 'image' && (
          <div className="text-section">
            <div className="left-section">
              <div className="input-section">
                <label>문자 내용 입력</label>
                <textarea
                  value={purposeContent}
                  onChange={(e) => setPurposeContent(e.target.value)}
                  placeholder="여기에 문자를 입력하세요."
                />
              </div>

              <div className="input-section">
                <label>조직</label>
                <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option value="유치원">유치원</option>
                  <option value="교회">교회</option>
                  <option value="동호회">동호회</option>
                </select>
              </div>

              <div className="input-section">
                <label>분위기</label>
                <select value={mood} onChange={(e) => setMood(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option value="세련된">세련된</option>
                  <option value="따듯한">따듯한</option>
                  <option value="극사실주의">극사실주의</option>
                  <option value="복고풍">복고풍</option>
                  <option value="차가운">차가운</option>
                  <option value="무서운">무서운</option>
                  <option value="귀여운">귀여운</option>
                </select>
              </div>

              <div className="input-section">
                <label>상황</label>
                <select value={situation} onChange={(e) => setSituation(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option value="축하">축하</option>
                  <option value="감사">감사</option>
                  <option value="사과">사과</option>
                </select>
              </div>

              <div className="input-section">
                <label>기타</label>
                <input
                  type="text"
                  value={otherInfo}
                  onChange={(e) => setOtherInfo(e.target.value)}
                  placeholder="기타 정보를 입력하세요."
                />
              </div>

              <div className="input-section">
                <label>저희가 참고할 이미지를 첨부해주세요 (선택)</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <button onClick={handleGenerateImage}>이미지 생성하기</button>
            </div>

            <div className="right-section">
              <label>이미지 생성</label>
              {generatedImages.length > 0 ? (
                <div className="image-grid">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={image}
                        alt={`생성된 이미지 ${index + 1}`}
                        onClick={() => handleImageSelect(image)}
                        className={`generated-image ${selectedImage === image ? 'selected' : ''}`}
                      />
                      <input
                        type="radio"
                        checked={selectedImage === image}
                        onChange={() => handleImageSelect(image)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>이미지를 생성하려면 왼쪽에서 옵션을 선택하고 "이미지 생성하기" 버튼을 누르세요.</p>
              )}

              <button
                onClick={handleSend}
                disabled={!selectedImage}
                className={!selectedImage ? 'disabled' : ''}
              >
                문자와 이미지 그대로 발송하기
              </button>
            </div>

          </div>
        )}
        {/* 이미지 생성 탭 */}
        {activeTab === 'gif' && (
          <div className="text-section">
            <div className="left-section">
              <div className="input-section">
                <label>문자 내용 입력</label>
                <textarea
                  value={purposeContent}
                  onChange={(e) => setPurposeContent(e.target.value)}
                  placeholder="여기에 문자를 입력하세요."
                />
              </div>

              <div className="input-section">
                <label>조직</label>
                <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option value="유치원">유치원</option>
                  <option value="교회">교회</option>
                  <option value="동호회">동호회</option>
                </select>
              </div>

              <div className="input-section">
                <label>분위기</label>
                <select value={mood} onChange={(e) => setMood(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option value="세련된">세련된</option>
                  <option value="따듯한">따듯한</option>
                  <option value="극사실주의">극사실주의</option>
                  <option value="복고풍">복고풍</option>
                  <option value="차가운">차가운</option>
                  <option value="무서운">무서운</option>
                  <option value="귀여운">귀여운</option>
                </select>
              </div>

              <div className="input-section">
                <label>상황</label>
                <select value={situation} onChange={(e) => setSituation(e.target.value)}>
                  <option value="">선택하세요</option>
                  <option value="축하">축하</option>
                  <option value="감사">감사</option>
                  <option value="사과">사과</option>
                </select>
              </div>

              <div className="input-section">
                <label>기타</label>
                <input
                  type="text"
                  value={otherInfo}
                  onChange={(e) => setOtherInfo(e.target.value)}
                  placeholder="기타 정보를 입력하세요."
                />
              </div>

              <div className="input-section">
                <label>저희가 참고할 이미지를 첨부해주세요 (선택)</label>
                <input type="file" onChange={handleFileChange} />
              </div>

              <button onClick={handleGenerateImage}>이미지 생성하기</button>
            </div>

            <div className="center-section">
              <label>gif 생성</label>
              {generatedImages.length > 0 ? (
                <div className="image-grid">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={image}
                        alt={`생성된 이미지 ${index + 1}`}
                        onClick={() => handleImageSelect(image)}
                        className={`generated-image ${selectedImage === image ? 'selected' : ''}`}
                      />
                      <input
                        type="radio"
                        checked={selectedImage === image}
                        onChange={() => handleImageSelect(image)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>gif를 생성하려면 왼쪽에서 옵션을 선택하고 "gif 생성하기" 버튼을 누르세요.</p>
              )}

              <button
                onClick={handleSend}
                disabled={!selectedImage}
                className={!selectedImage ? 'disabled' : ''}
              >
                문자와 이미지 그대로 발송하기
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default AiMessagePopup;
