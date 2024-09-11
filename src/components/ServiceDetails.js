import React from 'react';

const ServiceDetails = ({ service }) => {
  if (!service) {
    return <p>Service not found</p>;
  }

  return (
    <section className="ser-details section-padding overflow-hidden">
      <div className="container">
        <div className="content">
          <div className="row gx-5">
            <div className="col-lg-8">
              <div className="main-info">
                <div className="main-img img-cover">
                  <img src="/assets/img/services/services2.png" alt={service.title} />
                </div>
                <h3 className="text-capitalize mb-20">{service.title}</h3>
                <p className="mb-10">{service.overview}</p>

                <div className="imgs-items border-1 border-bottom border-top brd-gray">
                  <div className="img-item my-5">
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="icon mb-3 mb-lg-0">
                          <img src="/assets/img/icons/serv_icons/34.png" alt="work process icon" />
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <h5 className="fw-bold mb-2"> Our Work Process </h5>
                        <p>{service.workProcess}</p>
                      </div>
                    </div>
                  </div>
                  <div className="img-item my-5">
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="icon mb-3 mb-lg-0">
                          <img src="/assets/img/icons/serv_icons/35.png" alt="troubleshooting icon" />
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <h5 className="fw-bold mb-2"> Troubleshooting Process </h5>
                        <p>{service.troubleshooting}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-5 mb-4"> Going Beyond the Usual </h4>
                {service.points.map((point, index) => (
                  <p className="mt-10" key={index}>
                    <i className="fas fa-check-circle color-blue5 me-2"></i> <strong className="color-000">{point}</strong>
                  </p>
                ))}

                <div className="testi-card mt-60">
                  <div className="icon">
                    <img src="/assets/img/testimonials/qout.png" alt="quote icon" />
                  </div>
                  <div className="text">
                    {service.testimonials.map((testimonial, index) => (
                      <p key={index}>
                        &ldquo;{testimonial.feedback}&rdquo; <br /> &mdash; {testimonial.name}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="last-next-serv d-flex align-items-center justify-content-between mt-60">
                  <a href="#" className="item">
                    <p> Prev Service </p>
                    <h5 className="fw-bold"> Product Design </h5>
                  </a>
                  <a href="#" className="item text-end">
                    <p> Next Service </p>
                    <h5 className="fw-bold"> Web Development </h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="side-links mt-5 mt-lg-0">
                <div className="links-card mb-40">
                  <h5> Service Category </h5>
                  <ul>
                    {details.map((service) => (
                      <li key={service.id}>
                        <a href={`/services/${service.id}`}> 
                          <i className="far fa-angle-right icon"></i> {service.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="banner1">
                  <div className="title">
                    <h6> Call To Action </h6>
                    <h3> Make An Custom Request </h3>
                  </div>
                  <a href="#" className="butn bg-white rounded-pill hover-blue5">
                    <span> Get A Quote <i className="far fa-long-arrow-right ms-2"></i> </span>
                  </a>
                  <img src="/assets/img/mob1.png" alt="call to action" className="mob" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
