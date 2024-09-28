import { useState, useEffect } from 'react';
import Link from 'next/link';
import servicesData from '@data/Portfolio/projects.json';

const HomeServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Randomly shuffle and get 10 services
    const shuffledServices = servicesData.projects
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setServices(shuffledServices);
  }, []);

  return (
    <section className="portfolio-projects section-padding pt-50 style-1 bg-white">
      <div className="container">
        <div className="section-head text-center mb-40">
          <h2 className="mb-20">
            Our Services <span>.</span>
          </h2>
          <p>
            We offer a comprehensive range of automotive services designed to keep your vehicle in peak condition.
            <br />
            Explore our services to see how we can meet your car care needs.
          </p>
        </div>
        <div className="portfolio style-1">
          <div className="content">
            <div className="row mix-container">
              {services.map((service, i) => (
                <div className={`col-lg-4 mix ${service.filter}`} key={i}>
                  <div className={`portfolio-card ${i !== services.length - 1 ? 'mb-50' : ''}`}>
                    <div className="img">
                      <img src={service.image} alt={service.title} />
                    </div>
                    <div className="info">
                      <h5>
                        <Link href={`/servicedetails?services=${service.id}`}>
                          <a>{service.title}</a>
                        </Link>
                      </h5>
                      <small className="d-block color-main text-uppercase">{service.type}</small>
                      <p>{service.details}</p>
                      <Link href={`/servicedetails?services=${service.id}`}>
                        <a className="btn rounded-pill fw-bold text-white bg-blue4 mt-2">
                          <small>Read More</small>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link href="/services">
            <a className="btn rounded-pill fw-bold me-4 text-white bg-blue4">
              <small>Show More Services (24)</small>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
