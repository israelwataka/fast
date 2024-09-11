import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sendEmail', formData);
      if (response.data.success) {
        alert('Your message has been sent successfully!');
      }
    } catch (error) {
      alert('Failed to send your message. Please try again.');
    }
  };

  return (
    <section className="contact style-5 section-padding">
      <div className="container">
        <div className="section-head text-center mb-80 style-5">
          <h2> Get In <span> Touch </span> </h2>
          <p>
            More than 1,000 individuals trust and choose Highway Autosolutions
          </p>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon"> <i className="fas fa-user"></i> </span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon"> <i className="fas fa-phone"></i> </span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="icon"> <i className="fas fa-envelope"></i> </span>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <textarea
                    rows="6"
                    placeholder="Message"
                    className="form-control"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <span className="icon"> <i className="fas fa-pen"></i> </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="butn bg-blue5 rounded-3 mt-20 py-3 text-white">
                <span> Make A Request <i className="far fa-long-arrow-right ms-2"></i> </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
