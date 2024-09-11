import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Header = () => {
  const [phone, setPhone] = useState('+');
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus(null); // Reset status
    setError(null); // Reset error

    // Validate phone number length (should be 13 characters including the +)
    if (phone.length !== 13) {
      setError('Phone number must be 12 digits after the country code.');
      return;
    }

    try {
      const res = await axios.post('/api/phone', { phone });

      if (res.status === 200) {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Ensure the phone number always starts with +
    if (value.startsWith('+')) {
      setPhone(value);
    }
  };

  return (
    <header className="style-5" data-scroll-index="0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="info">
              <h1>Welcome to Highway Auto Spares
                <span>
                Quality Parts, Trusted Service, Every Time
                  {/* <img src="/assets/img/header/head5_pen.png" alt="" className="head-pen" /> */}
                </span>
              </h1>
              <p>Discover Quality Auto Parts & Expert Solutions at Highway Auto Spares <br/> Where Your Journey Begins.</p>
              <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <span className="icon">
                    <i className="far fa-phone"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={phone}
                    pattern="\+\d{12}" // Enforce pattern: + followed by 12 digits
                    onChange={handlePhoneChange}
                    required
                  />
                  <button type="submit" className="btn rounded-pill bg-blue5 hover-blue2 sm-butn fw-bold text-white">
                    <span>Request A Call <i className="bi bi-arrow-right ms-1"></i></span>
                  </button>
                </div>
              </form>
              {status === 'success' && <p className="text-success mt-3">Request sent successfully!</p>}
              {status === 'error' && <p className="text-danger mt-3">Error sending request. Please try again.</p>}
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      {/* <img src="/assets/add/head1.png" alt="" className="handl-img" />
      <img src="/assets/add/head.png" alt="" className="handr-img" /> */}
    </header>
  );
};

export default Header;
