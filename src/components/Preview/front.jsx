import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import servicesData from '@data/Portfolio/projects.json'; // Adjust the import path if necessary
import Link from 'next/link';

// Import Slick CSS directly in the component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ServicesCarousel = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Filter the services to include only those with IDs 3, 4, and 5
    const filteredServices = servicesData.projects.filter(
      (service) => service.id === "3" || service.id === "4" || service.id === "5"
    );
    setServices(filteredServices);
  }, []);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="services-carousel section-padding">
      <div className="container">
        <Slider {...settings}>
          {services.map((service) => (
            <div className="carousel-item" key={service.id}>
              <div className="carousel-image">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="carousel-content">
                <h4>{service.title}</h4>
                <p>{service.details}</p>
                <Link href={`/servicedetails?service=${service.id}`}>
                  <a className="btn rounded-pill fw-bold text-white bg-blue4">
                    View Service
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <style jsx>{`
        .services-carousel {
          position: relative;
          overflow: hidden;
        }
        .carousel-item {
          display: flex;
          align-items: flex-end; /* Align content at the bottom */
          background-color: rgba(0, 0, 0, 0.5); /* Optional background for better contrast */
          color: white;
          height: 400px; /* Adjust height as needed */
        }
        .carousel-image {
          flex: 1;
        }
        .carousel-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .carousel-content {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 10; /* Bring content above the image */
        }
      `}</style>
    </section>
  );
};

export default ServicesCarousel;
