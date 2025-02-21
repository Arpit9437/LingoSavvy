import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TextEditor from './pages/TextEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<TextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
