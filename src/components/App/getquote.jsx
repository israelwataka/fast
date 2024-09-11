import React, { useState } from 'react';
import axios from 'axios';

const GetQuote = () => {
  const currentYear = new Date().getFullYear();
  const knownCarBrands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan',
    'BMW', 'Mercedes-Benz', 'Volkswagen', 'Hyundai', 'Kia',
    'Other'
  ];

  const services = [
    'Car Key Programming', 'Car Key Cutting', 'Car key replacement',
    'AC System Repair and Refill', 'Car Computer Repair', 'Car radio unlocking',
    'Computerised car Diagnosis', 'Car Alarm installation', 'Car ignition and lock Repair'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceOrPart: '',
    comments: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post('/api/sendQuoteEmail', formDataToSend);
      if (response.data.success) {
        alert('Your request has been sent successfully!');
      } else {
        alert('Failed to send your request. Please try again.');
      }
    } catch (error) {
      alert('There was an error sending your request. Please try again later.');
    }
  };

  const styles = {
    section: {
      padding: '40px 0',
      backgroundColor: '#f9f9f9',
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 15px',
    },
    heading: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    paragraph: {
      marginBottom: '30px',
      color: '#555',
    },
    form: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      height: '100px',
      resize: 'vertical',
    },
    button: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'center',
      textDecoration: 'none',
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Get a Quote</h2>
        <p style={styles.paragraph}>Provide your details and vehicle information to get a quote.</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input
              type="text"
              style={styles.input}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="vehicleMake" style={styles.label}>Vehicle Make</label>
            <select
              style={styles.input}
              id="vehicleMake"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle Make</option>
              {knownCarBrands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
            {formData.vehicleMake === 'Other' && (
              <input
                type="text"
                style={styles.input}
                name="vehicleMakeOther"
                placeholder="Please specify"
                onChange={handleChange}
              />
            )}
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="vehicleModel" style={styles.label}>Vehicle Model</label>
            <input
              type="text"
              style={styles.input}
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              required
              placeholder="Enter vehicle model"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="vehicleYear" style={styles.label}>Vehicle Year</label>
            <input
              type="number"
              style={styles.input}
              id="vehicleYear"
              name="vehicleYear"
              value={formData.vehicleYear}
              onChange={handleChange}
              min="1900"
              max={currentYear}
              required
              placeholder="Enter vehicle year"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="serviceOrPart" style={styles.label}>Service or Part Needed</label>
            <select
              style={styles.input}
              id="serviceOrPart"
              name="serviceOrPart"
              value={formData.serviceOrPart}
              onChange={handleChange}
              required
            >
              <option value="">Select a Service</option>
              {services.map((service, index) => (
                <option key={index} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="comments" style={styles.label}>Additional Comments</label>
            <textarea
              style={styles.textarea}
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Provide any additional details or comments"
            ></textarea>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="file" style={styles.label}>Upload Images/Documents</label>
            <input
              type="file"
              style={styles.input}
              id="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>
          <button type="submit" style={styles.button}>Get Quote</button>
        </form>
      </div>
    </section>
  );
};

export default GetQuote;
