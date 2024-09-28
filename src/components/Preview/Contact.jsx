import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import contactInfo from '@data/Preview/contact.json';

const Contact = () => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    option: "",
    message: ""
  });

  const handleFormChange = (e) => {
    setFormdata(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/sendRequest', formData);
      if (res.status === 200) {
        alert('Form submitted successfully.');
      }
    } catch (error) {
      alert(`Error submitting the form: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <section className="contact section-padding bg-gradient style-1" data-scroll-index="7">
      <div className="container">
        <div className="section-head mb-60 text-center">
          <h6 className="text-white text-uppercase wow fadeInUp">contact us</h6>
          <h2 className="wow fadeInUp text-white">
            Request & <span className="fw-normal">Reach Us Out</span>
          </h2>
        </div>
        <div className="content">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="contact_info text-white">
                <p className="wow fadeInUp">Hotline 24/7</p>
                <h4 className="wow fadeInUp">{ contactInfo.phone }</h4>
                <ul>
                  <li className="wow fadeInUp">
                    <strong>Address : </strong> { contactInfo.address }
                  </li>
                  <li className="wow fadeInUp">
                    <strong>Email : </strong> { contactInfo.email }
                  </li>
                  <li className="wow fadeInUp">
                    <strong>Fax : </strong> { contactInfo.fax }
                  </li>
                  <li className="wow fadeInUp">
                    <strong>Work Hour : </strong> { contactInfo.workingHours }
                  </li>
                </ul>
                <Link href="https://www.google.com/maps/dir/highway+auto+solutions/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x1781d53e096b897b:0x60e7908658cd10fc?sa=X&ved=1t:3061&ictx=111">
                    <a className="wow fadeInUp" target="_blank" rel="noopener noreferrer">get direction</a>
                 </Link>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <form className="contact_form" onSubmit={handleFormSubmit}>
                <div className="row gx-3">
                  <div className="col-lg-6">
                    <div className="form-group mb-3 wow fadeInUp">
                      <input type="text" name="name" className="form-control" placeholder="name *" onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-3 wow fadeInUp">
                      <input type="text" name="email" className="form-control" placeholder="Email Address *" onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3 wow fadeInUp">
                      <select name="option" className="form-select" aria-label="Default select example" defaultValue="Your inquiry about" onChange={handleFormChange}>
                        <option>Your inquiry about</option>
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
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3 wow fadeInUp">
                      <textarea className="form-control" name="message" rows="4" placeholder="Write your inquiry here" onChange={handleFormChange}></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-check mb-4 wow fadeInUp">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                      <label className="form-check-label text-light small" htmlFor="flexCheckDefault">
                        By submitting, i’m agreed to the <Link href="/terms&conditions"><a className="text-decoration-underline">Terms & Conditons</a></Link>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <input type="submit" value="Request Now" className="btn btn-dark wow fadeInUp text-light fs-14px"></input>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img src="/assets/img/contact_globe.svg" alt="" className="contact_globe" />
    </section>
  );
};

export default Contact;
