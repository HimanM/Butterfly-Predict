import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DocumentationPage from './pages/Documentation';
import PredictionPage from './pages/PredictionPage'; // Import the new PredictionPage
import './App.css'; // Keep or modify as needed

// Placeholder for PredictionPage has been removed

function App() {
  return (
    <Router>
      {/* Ensure the outer div can stretch if needed, bg-gray-50 provides a neutral default background */}
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <main> {/* Using <main> for semantic content container */}
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
