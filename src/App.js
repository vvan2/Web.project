import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Mainpage/Mainpage';  // Mainpage 컴포넌트 임포트
import Mypage from './Mypage/Mypage';        // Mypage 컴포넌트 임포트
import MypagePw from './Mypage/Mypage_pw';
import MypageLetter from './Mypage/Mypage_letter';
import MypageStorage from './Mypage/Mypage_storage';
import MypageWithdraw from './Mypage/Mypage_withdraw';
import Login from './Login/Login';
import Join from './Join/Join';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Mypage" element={<Mypage />} />  {/* Mypage 라우트 추가 */}
        <Route path="/Mypage_pw" element={<MypagePw />} />
        <Route path="/Mypage_letter" element={<MypageLetter />} />
        <Route path="/Mypage_storage" element={<MypageStorage />} />
        <Route path="/Mypage_withdraw" element={<MypageWithdraw />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;