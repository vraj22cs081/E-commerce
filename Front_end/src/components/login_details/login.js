import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { username, password };

    try {
      const response = await fetch('http://localhost:9000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        if (rememberMe) {
          console.log('Remember me is checked');
        }
        navigate('/homepage');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="login-tab-content" className="tabcontent">
      <form className="login-form" action="" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          id="user_login"
          autoComplete="off"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="password"
          className="input"
          id="user_pass"
          autoComplete="off"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          type="checkbox"
          className="checkbox"
          id="remember_me"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        <label htmlFor="remember_me">Remember me</label>
        <input type="submit" className="button" value="Login" />
      </form>
      <div className="help-text">
        <p>
          <a href="#">Forget your password?</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
