// LoginForm.js
import React, { useState } from 'react';
import "./PrayerRequestForm.css"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted:', { username, password });
  };

  return (
    <>
    <header>
        <h2>Login to view your submissions</h2>
    </header>
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Please enter your email address:</label>
        <input
          type="text"
          id="email"
          placeholder="Your email address"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit">View/Edit My List</button>
      </form>
    </div>
    </>
  );
};

export default LoginForm;
