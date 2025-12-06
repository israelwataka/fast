import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Highway Auto Solutions - Professional Automotive Services</title>
        <meta name="description" content="Expert automotive services and repairs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/add/favicon.ico" />
      </Head>

      <div className="homepage">
        <nav className="navbar">
          <div className="container">
            <Link href="/" className="logo">
              Highway Auto Solutions
            </Link>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/admin/login">Admin</Link>
            </div>
          </div>
        </nav>

        <header className="hero">
          <video className="hero-video" autoPlay loop muted playsInline>
            <source src="/assets/videos/vid1.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Professional Automotive Services</h1>
            <p>Expert care for your vehicle with quality service you can trust</p>
            <Link href="/admin/login" className="btn-primary">
              Admin Panel
            </Link>
          </div>
        </header>

        <section className="info-section">
          <div className="container">
            <h2>Welcome to Highway Auto Solutions</h2>
            <p>Your trusted partner for all automotive services and repairs. We provide professional maintenance, diagnostics, and repair services for all vehicle makes and models.</p>

            <div className="features">
              <div className="feature">
                <h3>Expert Technicians</h3>
                <p>Certified professionals with years of experience</p>
              </div>
              <div className="feature">
                <h3>Quality Service</h3>
                <p>Top-notch service using the latest equipment</p>
              </div>
              <div className="feature">
                <h3>Fair Pricing</h3>
                <p>Transparent pricing with no hidden fees</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Highway Auto Solutions. All rights reserved.</p>
            <p>Content managed via <Link href="/admin/login">Admin Panel</Link></p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .navbar {
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0066cc;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: #333;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #0066cc;
        }

        .hero {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-video {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: white;
          padding: 2rem;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
        }

        .btn-primary {
          display: inline-block;
          padding: 1rem 2.5rem;
          background: #0066cc;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          background: #0052a3;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 102, 204, 0.4);
        }

        .info-section {
          padding: 5rem 0;
          background: #f8f9fa;
        }

        .info-section h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 1rem;
          color: #1a1a1a;
        }

        .info-section > .container > p {
          text-align: center;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto 3rem;
          color: #666;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
        }

        .feature h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #0066cc;
        }

        .feature p {
          color: #666;
        }

        .footer {
          background: #1a1a1a;
          color: #ccc;
          padding: 2rem 0;
          text-align: center;
        }

        .footer p {
          margin: 0.5rem 0;
        }

        .footer a {
          color: #0066cc;
          text-decoration: none;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .nav-links {
            gap: 1rem;
          }

          .features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
