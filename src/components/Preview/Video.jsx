import { useState } from 'react';
import testimonials from '@data/Preview/video.json';

const Testimonials = () => {
  const [isMiniPlayer, setIsMiniPlayer] = useState(false);

  const toggleMiniPlayer = () => {
    setIsMiniPlayer(!isMiniPlayer);
  };

  const miniPlayerStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '300px', // Smaller size for mini player
    height: '170px', // 16:9 aspect ratio
    zIndex: '1000',
    border: '1px solid #ccc',
    backgroundColor: '#000',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const closeMiniPlayerStyles = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#fff',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  };

  return (
    <section className="testimonials section-padding style-1" data-scroll-index="5">
      <div className="container">
        <div className="section-head mb-60 text-center">
          <h6 className="color-main text-uppercase wow fadeInUp">Expert Solutions </h6>
          <h2 className="wow fadeInUp">
          Where every ride  <span className="fw-normal">meets excellence.</span>
          </h2>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-lg-5">
              <div 
                className="vid_img mb-2 mb-md-0 wow zoomIn slow" 
                onClick={toggleMiniPlayer}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <img 
                  src="/assets/add/pic.jpg" 
                  alt="" 
                  style={{ width: '100%', borderRadius: '8px' }} 
                />
                <a 
                  href="#" 
                  className="play_icon" 
                  onClick={(e) => {
                    e.preventDefault();
                    toggleMiniPlayer();
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '40px',
                    color: '#fff',
                  }}
                >
                  <i className="bi bi-play"></i>
                </a>
                <div className="img_info wow fadeInUp" style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#fff' }}>
                  <h4><a href="#">John Kiptoo</a></h4>
                  <small><a href="#"> Highway Auto Solutions</a></small>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="info wow fadeInUp">
                {testimonials.map((testimonial, index) => (
                  <div className={`client_card ${index !== testimonials.length - 1 ? 'mb-2' : ''}`} data-wow-delay={index * 0.2 + "s"} key={index}>
                    <div className="user_img">
                      <img src={testimonial.userImg} alt="" />
                    </div>
                    <div className="inf_content">
                      <div className="rate_stars">
                        {Array(testimonial.stars).fill().map((_, i) => (
                          <i key={i} className="bi bi-star-fill"></i>
                        ))}
                      </div>
                      <h6>“{testimonial.comment}”</h6>
                      <p>{testimonial.username} <span className="text-muted">/ {testimonial.position}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Video Mini Player */}
      {isMiniPlayer && (
        <div style={miniPlayerStyles}>
          <video
            id="testimonial-video-mini"
            src="/assets/videos/vid1.mp4"
            controls
            autoPlay
            style={videoStyle}
          />
          <button style={closeMiniPlayerStyles} onClick={toggleMiniPlayer}>X</button>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
