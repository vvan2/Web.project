import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Mainpage/Mainpage';  // Mainpage 컴포넌트 임포트
import Mypage from './Mypage/Mypage';        // Mypage 컴포넌트 임포트

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Mypage" element={<Mypage />} />  {/* Mypage 라우트 추가 */}
      </Routes>
    </Router>
  );
}

export default App;