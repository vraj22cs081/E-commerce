import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };
    try {
      const response = await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include' // Add this line
      });
      if (response.ok) {
        if (rememberMe) console.log('Remember me is checked');
        navigate('/homepage');
      } else console.error('Login failed');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="company-name">Your Company</div>
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-switch-container">
            <button className="auth-switch-button">Login</button>
            <button className="auth-switch-button">Sign Up</button>
          </div>
          <input
            type="text"
            className="auth-input"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="auth-checkbox-container">
            <input
              type="checkbox"
              className="auth-checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember_me" className="auth-label">Remember me</label>
          </div>
          <div className="auth-button-container">
            <input type="submit" className="auth-button" value="Login" />
            <a href="/signup" className="auth-link">Don't have an account? Sign Up here.</a>
          </div>
        </form>
        <div className="auth-help-text">
          {/* <p><a href="#">Forget your password?</a></p> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
