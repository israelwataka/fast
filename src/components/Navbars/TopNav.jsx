import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons from react-icons

const TopNav = ({ style }) => {
  return (
    <div className={`top-navbar style-${style}`} style={{ backgroundColor: '#333', padding: '10px 0', position: 'relative', zIndex: 1000 }}>
      <div className="container">
        <div className="content text-white d-flex align-items-center justify-content-between">
          {/* Contact Details */}
          <div className="contact-details">
            <span className="fs-10px me-2">
              <Link href="tel:+254723880785">
                <a className="text-decoration-underline" style={{ color: 'white' }}>(+254) 723 880 785</a>
              </Link>
            </span>
            <span className="fs-10px me-2">|</span>
            <span className="fs-10px me-2">
              <Link href="mailto:contact@highwayautosolutions.com">
                <a className="text-decoration-underline" style={{ color: 'white' }}>contact@highwayautosolutions.com</a>
              </Link>
            </span>
            <span className="fs-10px me-2">|</span>
            <span className="fs-10px" style={{ color: 'white' }}>Located at Wings, Bungoma</span>
          </div>

          {/* Social Media Links with Icons */}
          <div className="social-media-links d-flex align-items-center">
            <Link href="https://facebook.com">
              <a className="fs-10px me-3" style={{ color: 'white' }}>
                <FaFacebookF />
              </a>
            </Link>
            <Link href="https://x.com">
              <a className="fs-10px me-3" style={{ color: 'white' }}>
                <FaTwitter />
              </a>
            </Link>
            <Link href="https://instagram.com">
              <a className="fs-10px" style={{ color: 'white' }}>
                <FaInstagram />
              </a>
            </Link>
          </div>

          {/* Moving Announcement */}
          <div className="moving-announcement" style={{ marginLeft: '20px' }}>
            <marquee behavior="scroll" direction="left" style={{ color: 'white', fontSize: '12px' }}>
              Welcome to Highway Autosolutions - Your trusted partner for expert car services!
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;