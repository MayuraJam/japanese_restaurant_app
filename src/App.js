import logo from './logo.svg';
import './App.css';
// index.js หรือ App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './page/TestPage.jsx' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
     <Router>
    <Routes>
      <Route path="/main" element={<Test/>} />
     </Routes>
    </Router>
  );
}

export default App;
