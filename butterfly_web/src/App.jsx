import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DocumentationPage from './pages/Documentation';
import PredictionPage from './pages/PredictionPage'; 
import './App.css'; 



function App() {
  return (
    <Router>
      
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <main> 
          <Routes>
            <Route path="/" element={<PredictionPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
