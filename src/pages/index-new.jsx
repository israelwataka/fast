import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.filter(s => s.is_active).slice(0, 6)))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Head>
        <title>Highway Auto Solutions - Professional Automotive Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <nav className="navbar">
          <div className="container">
            <Link href="/" className="logo">Highway Auto Solutions</Link>
            <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </nav>

        <header className="hero">
          <div className="hero-content">
            <h1>Expert Automotive Care</h1>
            <p>Professional service and quality repairs you can trust</p>
            <Link href="/contact" className="btn">Get Started</Link>
          </div>
        </header>

        <section className="services">
          <div className="container">
            <h2>Our Services</h2>
            <div className="grid">
              {services.map(service => (
                <div key={service.id} className="card">
                  <h3>{service.title}</h3>
                  <p>{service.description.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Highway Auto Solutions</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .navbar { background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 1rem 0; }
        .navbar .container { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #333; text-decoration: none; }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a { color: #666; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 6rem 2rem; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.25rem; margin-bottom: 2rem; }
        .btn { display: inline-block; padding: 0.75rem 2rem; background: white; color: #667eea; border-radius: 5px; text-decoration: none; font-weight: 600; }
        .services { padding: 4rem 0; }
        .services h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .card { background: #f8f9fa; padding: 2rem; border-radius: 8px; }
        .card h3 { margin-bottom: 1rem; color: #333; }
        .card p { color: #666; line-height: 1.6; }
        .footer { background: #333; color: white; padding: 2rem 0; text-align: center; }
      `}</style>
    </>
  );
}
