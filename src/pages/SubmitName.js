// SubmitNames.js
//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import PrayerRequestForm from '../components/PrayerRequestForm';
//import SuccessfulSubmission from '../components/SuccessfulSubmission';

function SubmitNames() {
  return (
    <div>
      <h2>Submit names to enter them into the weekly Tefillah list</h2>
      <PrayerRequestForm />
    </div>
  );
}

export default SubmitNames;
