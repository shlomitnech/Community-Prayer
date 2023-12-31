import React, { useState } from 'react';
import './Forms.css';

function PrayerRequestForm() {
    const [formData, setFormData] = useState({
        TefilahID: '',
        HebrewName: '',
        EnglishName: '',
        Notes: '',
        Email: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        // Define your API Gateway endpoint URL
        const apiEndpoint = 'https://qeiro6fqn1.execute-api.us-east-1.amazonaws.com/dev';
    
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        };
    
        // Send the data to your API endpoint for processing using fetch():
        fetch(apiEndpoint, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from your Lambda function or API
            if (data.statusCode === 200) {
              alert('Prayer request submitted successfully!');
              setFormData({
                TefilahID: 'HEALTH',
                HebrewName: '',
                EnglishName: '',
                Notes: '',
                Email: '',
              });
            } else {
              alert('Error: ' + data.body.error);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while submitting the request.');
          });
      };
    
      return (
        <>
          <header>
            <h1>Prayer Request Form</h1>
          </header>
          <div className="container">
            <form id="prayerForm" onSubmit={handleSubmit}>
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
                placeholder="The Hebrew Name"
                value={formData.HebrewName}
                onChange={handleChange}
                required
              />
    
              <label htmlFor="EnglishName">English Name:</label>
              <input
                type="text"
                id="EnglishName"
                name="EnglishName"
                placeholder="The English Name"
                value={formData.EnglishName}
                onChange={handleChange}
                required
              />
    
              <label htmlFor="Notes">Notes:</label>
              <textarea
                id="Notes"
                name="Notes"
                placeholder="Additional Notes (optional)"
                value={formData.Notes}
                onChange={handleChange}
              ></textarea>
    
              <label htmlFor="Email">Email:</label>
              <input
                type="text"
                id="Email"
                name="Email"
                placeholder="Your Email Address"
                value={formData.Email}
                onChange={handleChange}
                required
              />
    
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      );
    }
    

export default PrayerRequestForm;