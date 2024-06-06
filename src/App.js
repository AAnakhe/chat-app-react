import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ChatInterface from './components/ChatInterface';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/chatinterface"
          element={isAuthenticated ? <ChatInterface /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
