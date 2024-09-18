import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Added state for remember me
  const navigate = useNavigate();

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleRememberMeChange = () => setRememberMe(!rememberMe); // Toggle remember me state

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation
    if (!username || !password || (!isLogin && !email)) {
      alert('Please fill in all required fields.');
      return;
    }

    const user = { username, password, email };

    try {
      const response = await fetch(`http://localhost:9000/users/${isLogin ? 'login' : 'signup'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include' // Add this line
      });

      const responseData = await response.json(); // Parse the JSON response from server
      console.log('Server response:', responseData); // Log the response for debugging

      if (response.ok) {
        // If the response is OK (e.g., status 200)
        if (rememberMe) {
          // Save login details or token in localStorage
          localStorage.setItem('user', JSON.stringify(user)); // Example
        }
        // Navigate to the appropriate page after successful login/signup
        navigate(isLogin ? '/homepage' : '/login');
      } else {
        // Handle errors returned from the server
        const errorMessage = responseData.message || 'An error occurred';
        if (isLogin) {
          alert(`Login failed: ${errorMessage.includes('invalid') ? 'Incorrect username or password' : errorMessage}`);
        } else {
          alert(`Signup failed: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="company-name">
        <h1>MARUTI ENTERPRISE</h1>
      </div>
      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-switch-container">
            <button
              type="button"
              className={`auth-switch-button ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-switch-button ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
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
          {!isLogin && (
            <input
              type="email"
              className="auth-input"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          )}
          {isLogin && (
            <div className="auth-checkbox-container">
              <input
                type="checkbox"
                className="auth-checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label className="auth-label">Remember me</label>
            </div>
          )}
          <div className="auth-button-container">
            <input
              type="submit"
              className={`auth-button ${isLogin ? 'login-button' : 'signup-button'}`}
              value={isLogin ? 'Login' : 'Sign Up'}
            />
            {isLogin ? (
              <Link to="/signup" className="auth-link" onClick={() => setIsLogin(false)}>
                Don't have an account? Sign Up here.
              </Link>
            ) : (
              <Link to="/login" className="auth-link" onClick={() => setIsLogin(true)}>
                Already registered? Log in here.
              </Link>
            )}
          </div>
        </form>
        <div className="auth-help-text">
          <p><a href="#">Forget your password?</a></p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
