import React, { useState } from 'react';
import DisplayNames from '../Components/DisplayNames'; // Import DisplayNames

function MyNames({ initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail); // Email state for input
  const [submittedEmail, setSubmittedEmail] = useState(initialEmail); // Email used for fetching data

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedEmail(email); // Set the email for DisplayNames to fetch data
  };

  return (
    <div>
      <h1>My Names</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email to Fetch Names:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Fetch Names</button>
      </form>

      {/* DisplayNames component */}
      {submittedEmail && (
        <DisplayNames email={submittedEmail} />
      )}
    </div>
  );
}

export default MyNames;
