// LoginForm.js
import React, { useState } from 'react';
import "./Forms.css"

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the email to the onLogin prop
    onLogin(email);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">View/Edit My List</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;