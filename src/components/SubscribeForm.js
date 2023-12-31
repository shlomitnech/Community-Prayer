import React, { useState } from 'react';
import './PrayerRequestForm.css';

function SubscribeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleSubscription(formData);

    // Optionally, reset the form
    setFormData({
      name: '',
      email: ''
    });
  };

  const handleSubscription = (data) => {
    // You can perform actions here, such as making an API request to subscribe the user
    console.log('Subscription data:', data);
    alert('Subscription successful!'); // You can replace this with your logic
  };

  return (
    <div className = "container">
      <form id ="subscribeForm" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default SubscribeForm;
