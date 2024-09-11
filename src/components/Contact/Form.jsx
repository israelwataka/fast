import { useState } from 'react';
import axios from 'axios';
import contactInfo from '@data/Contact/form.json';

const Form = ({ style = "4" }) => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    option: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFormChange = (e) => {
    setFormdata(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.option) newErrors.option = "Option is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus(null); // Reset status

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.post('/api/sendEmail', formData);

      if (res.status === 200) {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleNewRequest = () => {
    setFormdata({
      name: "",
      email: "",
      phone: "",
      option: "",
      message: ""
    });
    setStatus(null);
    setErrors({});
  };

  return (
    <section className={`contact section-padding pt-${style === '4' ? '0' : '50'} style-6`}>
      {
        style === '5' && (
          <>
            <div className="section-head text-center mb-100 style-5">
              <h2 className="mb-20">Get In <span>Touch</span></h2>
              <p>We will contact again after receive your request in 24h</p>
            </div>
            <div className="text-center mb-100">
              <h2 className="ltspc-20 text-uppercase fs-1 lh-1 mb-50 mt-30 color-blue5">{contactInfo.phone}</h2>
              <h4 className="fw-normal mb-20 color-000">{contactInfo.email}</h4>
              <h4 className="fw-normal mb-10 color-000">{contactInfo.address}</h4>
            </div>
          </>
        )
      }
      <div className="container">
        <div className="content">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {status === 'success' ? (
                <div className="text-center">
                  <h2 className="text-success">✔ Message delivered</h2>
                  <p>We will get back to you ASAP</p>
                  <button className="btn btn-primary" onClick={handleNewRequest}>New Service Request</button>
                </div>
              ) : (
                <form className="form" method="post" onSubmit={handleFormSubmit}>
                  <p className="text-center text-danger fs-12px mb-30">The field is required mark as *</p>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group mb-20">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Name *"
                          onChange={handleFormChange}
                          value={formData.name}
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-20">
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="Email Address *"
                          onChange={handleFormChange}
                          value={formData.email}
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group mb-20">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Phone Number *"
                          onChange={handleFormChange}
                          value={formData.phone}
                        />
                        {errors.phone && <p className="text-danger">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group mb-20">
                        <select
                          className="form-select"
                          name="option"
                          onChange={handleFormChange}
                          value={formData.option}
                        >
                          <option value="">How can we help you? *</option>
                          <option value="Car key programming">Car key programming</option>
                          <option value="Car Key Cutting">Car Key Cutting</option>
                          <option value="Car key replacement">Car key replacement</option>
                          <option value="Ac System Repair and Refill">Ac System Repair and Refill</option>
                          <option value="Car Computer Repair">Car Computer Repair</option>
                          <option value="Car radio unlocking">Car radio unlocking</option>
                          <option value="Computerised car Diagnosis">Computerised car Diagnosis</option>
                          <option value="Car Alarm installation">Car Alarm installation</option>
                          <option value="Car ignition and lock Repair">Car ignition and lock Repair</option>
                          <option value="Other car services">Other car services</option>
                        </select>
                        {errors.option && <p className="text-danger">{errors.option}</p>}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          rows="10"
                          name="message"
                          className="form-control"
                          placeholder="How can we help you? *"
                          onChange={handleFormChange}
                          value={formData.message}
                        ></textarea>
                        {errors.message && <p className="text-danger">{errors.message}</p>}
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      <div className="form-check d-inline-flex mt-30 mb-30">
                        <input className="form-check-input me-2 mt-0" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label small" htmlFor="flexCheckDefault">
                          By submitting, I agree to the <a href="#" className="text-decoration-underline">Terms & Conditions</a>
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-12 text-center">
                      <input type="submit" value="Send Your Request" className="btn rounded-pill blue5-3Dbutn hover-blue2 sm-butn fw-bold text-light" />
                    </div>
                  </div>
                  {status === 'error' && <p className="text-center text-danger mt-3">Error sending email. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
          <img src="/assets/img/icons/contact_a.png" alt="" className="contact_a" />
          <img src="/assets/img/icons/contact_message.png" alt="" className="contact_message" />
        </div>
      </div>
    </section>
  );
};

export default Form;
