// LoginAndSearchForm.js
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SearchForm from './SearchForm';
import "./PrayerRequestForm.css";
/*
const LoginAndSearchForm = ({ onSearch, fetchUserData }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email) => {
    try {
      // Make a request to your authentication endpoint
      const response = await fetch('https://hj4lkaa9p2.execute-api.us-east-1.amazonaws.com/return1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Login Error');
      }

      // Assuming successful login, fetch user data
      const userData = await response.json();

      // Call the fetchUserData function to get additional user data
      const additionalUserData = await fetchUserData(); // Implement this function to fetch user data

      setUser({ ...userData, ...additionalUserData });
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, show a message or redirect to login again
    }
  };

  return (
    <>
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <header>
            <h2>Search and Edit Submissions</h2>
          </header>
          <div className="container">
            <SearchForm onSearch={onSearch} />
            {/* Render user data on the screen *//*}
            <div>
              <h3>User Data</h3>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginAndSearchForm;
*/