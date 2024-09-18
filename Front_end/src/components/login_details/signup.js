import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password, email };
    try {
      const response = await fetch('http://localhost:9000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include' // Add this line
      });
      if (response.ok) {
        navigate('/login');
      } else console.error('Signup failed');
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
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="auth-button-container">
            <input type="submit" className="auth-button" value="Sign Up" />
            <a href="/login" className="auth-link">Already registered? Log in here.</a>
          </div>
        </form>
        <div className="auth-help-text">
          <p>By signing up, you agree to our <a href="#">terms of service</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
