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

  const handleGenerateMessage = () => {
    if (!purposeContent || !keywords) {
      alert('발송목적 및 주요 키워드를 입력해 주세요.');
      return;
    }

    setIsGenerating(true);

    const combinedMessage = `발송목적: ${purposeContent}\n주요 키워드: ${keywords}`;
    setGeneratedMessage(combinedMessage);
    setIsGenerating(false);
  };

  const handleRegenerateMessage = () => {
    handleGenerateMessage();
  };

  const handleUseMessage = () => {
    if (generatedMessage) {
      setAiMessage({ purposeContent: generatedMessage });
      closePopup();
    }
  };

  const handleGenerateImage = () => {
    const images = [
      '/path/to/image1.png',
      '/path/to/image2.png',
      '/path/to/image3.png',
      '/path/to/image4.png',
    ];
    setGeneratedImages(images);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSend = () => {
    if (selectedImage && purposeContent) {
      setAiMessage({ purposeContent, selectedImage });
      closePopup();
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
              <button onClick={closePopup}>문자만 보낼래요</button>
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
                    <div key={index}>
                      <img
                        src={image}
                        alt={`생성된 이미지 ${index + 1}`}
                        onClick={() => handleImageSelect(image)}
                        className={selectedImage === image ? 'selected' : ''}
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
      </div>
    </div>
  );
}

export default AiMessagePopup;
