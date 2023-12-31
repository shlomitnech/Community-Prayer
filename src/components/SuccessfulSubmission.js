// SuccessfulSubmission.js
import React from 'react';
import './SubscribeForm.css'

function SuccessfulSubmission({ namesID }) {
  return (
    <div>
      <h2>Successful Submission</h2>
      <p>Your submission was successful. NamesID: {namesID}</p>
      {/* Add more options or links here */}
    </div>
  );
}

export default SuccessfulSubmission;
