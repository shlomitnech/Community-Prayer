import React, { useState } from 'react';

function Subscribe() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const apiEndpoint = 'https://pm67q3uot8.execute-api.us-east-1.amazonaws.com/stage1/subscribeEmails';  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email) {
      setError('Email is required');
      return;
    }
  
    setError('');
    setMessage(''); // Clear previous messages
  
    try {
      // Send email as a stringified object within the body
      const requestBody = {
        body: JSON.stringify({ email }) // Here, we stringify the email inside the 'body' field
      };

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Log the response for debugging
      console.log('Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error Response:', errorData);
        throw new Error(errorData.message || 'Failed to subscribe');
      }
  
      setMessage('Subscription successful!');
      setEmail(''); // Clear the email field after success
    } catch (err) {
      console.error('Error:', err);
      setError(`Error: ${err.message}`);
    }
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>Subscribe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Subscribe
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Subscribe;
