import { useState } from 'react';
import axios from 'axios';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus(null); // Reset status

    try {
      const res = await axios.post('/api/subscribe', { email });

      if (res.status === 200) {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="cal-actn section-padding text-white" data-overlay-dark="0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="cont text-center">
              <h6 className="sub-title inline gr-sunrise-text my-3 text-uppercase">Hey</h6>
              <h2>Exciting Services on the Horizon</h2>
              <p className="mt-15">Driving Innovation: Advanced Repair Solutions Rolling Out Soon at Highway Autosolutions!</p>
              <p>Get Notified. Subscribe to our newsletter</p>

              <form className="newsletter-form mt-4" onSubmit={handleFormSubmit} style={{ display: 'inline-block', maxWidth: '500px', position: 'relative' }}>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', borderRadius: '50px', overflow: 'hidden', border: '1px solid #ccc' }}>
                  <span className="icon" style={{ padding: '10px', color: '#888' }}>
                    <i className="far fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your email address"
                    required
                    style={{ 
                      flex: 1, 
                      padding: '10px 15px', 
                      border: 'none', 
                      outline: 'none' 
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn rounded-pill bg-blue4 fw-bold text-white" style={{ border: 'none', borderRadius: '0', padding: '10px 20px' }}>
                    <small className="text-uppercase">Subscribe</small>
                  </button>
                </div>
              </form>

              {status === 'success' && <p className="text-success mt-3">Subscribed successfully!</p>}
              {status === 'error' && <p className="text-danger mt-3">Error subscribing. Please try again.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="circle-img">
        <img src="/landing-preview/img/circle.png" alt="" />
      </div>
    </section>
  );
};

export default CallToAction;
