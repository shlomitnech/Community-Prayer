import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import './Forms.css';

function PrayerRequestForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    TefilahID: 'HEALTH',
    HebrewName: '',
    EnglishName: '',
    Notes: '',
    Email: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  //const submitApiEndpoint = 'https://qeiro6fqn1.execute-api.us-east-1.amazonaws.com/dev'; // Submit names API
  const subscribeApiEndpoint = 'https://pm67q3uot8.execute-api.us-east-1.amazonaws.com/stage1/subscribeEmails'; // Subscribe API endpoint
  const submitApiEndpoint = "hhttps://sr63twe8ij.execute-api.us-east-1.amazonaws.com/Prod/submit-name"
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Email) {
      setError('Email is required');
      return;
    }

    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      // // Submit the name request
      // const nameResponse = await fetch(submitApiEndpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      const queryParams = new URLSearchParams(formData).toString();

      // Submit the name request
      const nameResponse = await fetch(`${submitApiEndpoint}?${queryParams}`, {
        method: 'POST',
      });

      const nameData = await nameResponse.json();
      if (!nameResponse.ok) {
        throw new Error(nameData.body.error || 'Failed to submit name');
      }

      // Subscribe the email
      const subscribeResponse = await fetch(subscribeApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: JSON.stringify({ email: formData.Email }), // Ensure email is in the required format
        }),
      });

      const subscribeData = await subscribeResponse.json();
      if (!subscribeResponse.ok) {
        throw new Error(subscribeData.message || 'Failed to subscribe');
      }

      // Update UI after success
      setMessage('Prayer request submitted and email subscribed successfully!');
      setShowModal(true);
      setFormData({
        TefilahID: 'HEALTH',
        HebrewName: '',
        EnglishName: '',
        Notes: '',
        Email: '',
      });
    } catch (err) {
      console.error('Error:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewNames = () => {
    setShowModal(false);
    navigate('/MyNames', { state: { email: formData.Email } });
  };

  const handleAddAnotherName = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  return (
    <>
      <header>
        <h3>Enter the name and details below</h3>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="TefilahID">Type of Prayer Request:</label>
          <select
            id="TefilahID"
            name="TefilahID"
            value={formData.TefilahID}
            onChange={handleChange}
            required
          >
            <option value="HEALTH">Health/Refuah</option>
            <option value="WEALTH">Financial Struggle/Parnasah</option>
            <option value="KIDS">For Children</option>
            <option value="SPOUSE">To Find A Spouse</option>
          </select>

          <label htmlFor="HebrewName">Hebrew Name:</label>
          <input
            type="text"
            id="HebrewName"
            name="HebrewName"
            placeholder="Ploni Ben Ploni"
            value={formData.HebrewName}
            onChange={handleChange}
            required
          />

          <label htmlFor="EnglishName">English Name: *optional</label>
          <input
            type="text"
            id="EnglishName"
            name="EnglishName"
            placeholder="First Last"
            value={formData.EnglishName}
            onChange={handleChange}
          />

          <label htmlFor="Notes">Notes: *optional</label>
          <textarea
            id="Notes"
            name="Notes"
            placeholder="Additional Information"
            value={formData.Notes}
            onChange={handleChange}
          ></textarea>

          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            placeholder="Your Email Address"
            value={formData.Email}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Prayer Request Submitted!</h2>
        <p>Your request has been successfully added to the database and email subscribed.</p>
        <div className="modal-actions">
          <button onClick={handleAddAnotherName}>Add Another Name</button>
          <button onClick={handleViewNames}>View My Names</button>
        </div>
      </Modal>
    </>
  );
}

export default PrayerRequestForm;
