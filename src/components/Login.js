import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebSocketSingleton from '../utils/WebSocketSingleton';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setMessage('Please enter both username and password.');
      return;
    }

    const payload = { username, password };

    try {
      const response = await fetch('http://localhost:3010/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('username', username);
        WebSocketSingleton.initialize(username);
        onLogin(true);
        navigate('/chatinterface');
      } else {
        setMessage(result.message || 'Login failed.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div id="login-container" className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="login-button" onClick={handleLogin}>
        Login
      </button>
      <div>
        {message}
      </div>
    </div>
  );
}

export default Login;
