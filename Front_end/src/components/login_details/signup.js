import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = { username, password, email };

    try {
      const response = await fetch('http://localhost:9000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="signup-tab-content" className="tabcontent">
      <form className="signup-form" action="" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          id="user_name"
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
          type="email"
          className="input"
          id="user_email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input type="submit" className="button" value="Signup" />
        <a href="/login">Already register</a>
      </form>
      <div className="help-text">
        <p>
          By signing up, you agree to our <a href="#">terms of service</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
