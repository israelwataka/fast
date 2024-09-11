import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import detailsData from '@data/Portfolio/details.json';

const Details = () => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [prevService, setPrevService] = useState(null);
  const [nextService, setNextService] = useState(null);
  const router = useRouter();
  const { services } = router.query;

  useEffect(() => {
    if (services) {
      const currentServiceIndex = detailsData.findIndex(detail => detail.id === services);
      const service = detailsData[currentServiceIndex];
      const prevService = detailsData[currentServiceIndex - 1] || null;
      const nextService = detailsData[currentServiceIndex + 1] || null;

      setServiceDetails(service);
      setPrevService(prevService);
      setNextService(nextService);
    }
  }, [services]);

  if (!serviceDetails) {
    return <div>Loading...</div>;
  }

  const serviceCategories = {
    "Key Services": [
      { id: "1", title: "Car Key Programming" },
      { id: "2", title: "Car Key Cutting" },
      { id: "3", title: "Car Key Replacement" },
      { id: "4", title: "Remote Key Fob Replacement" },
      { id: "5", title: "Transponder Key Services" }
    ],
    "Electrical and Electronics": [
      { id: "6", title: "Car Radio Unlocking" },
      { id: "7", title: "Car Alarm Installation" },
      { id: "8", title: "Car Computer Repair" },
      { id: "9", title: "Car Battery Replacement" },
      { id: "10", title: "Electrical System Diagnostics" }
    ],
    "Diagnostics and Repair": [
      { id: "11", title: "Computerized Car Diagnosis" },
      { id: "12", title: "AC System Repair and Refill" },
      { id: "13", title: "Ignition System Repair" },
      { id: "14", title: "Engine Light Diagnostics" },
      { id: "15", title: "Transmission Repair" }
    ],
    "Locks and Security": [
      { id: "16", title: "Car Ignition and Lock Repair" },
      { id: "17", title: "Vehicle Lockout Services" },
      { id: "18", title: "Anti-theft System Installation and Repair" },
      { id: "19", title: "Keyless Entry System Installation" }
    ],
    "General Maintenance": [
      { id: "20", title: "Regular Car Maintenance (Oil Changes, Filter Replacements)" },
      { id: "21", title: "Brake System Repair" },
      { id: "22", title: "Suspension and Steering Repairs" },
      { id: "23", title: "Tire Services (Rotation, Balancing, Alignment)" }
    ],
    "Customization and Upgrades": [
      { id: "24", title: "Car Audio System Upgrades" },
      { id: "25", title: "LED Lighting Installation" },
      { id: "26", title: "Aftermarket Accessory Installation" },
      { id: "27", title: "Performance Tuning" }
    ]
  };

  return (
    <section className="ser-details section-padding overflow-hidden">
      <div className="container">
        <div className="content">
          <div className="row gx-5">
            <div className="col-lg-8">
              <div className="main-info">
                <div className="main-img img-cover">
                  <img src={serviceDetails.image} alt={serviceDetails.title} />
                </div>
                <h3 className="text-capitalize mb-20">{serviceDetails.title}</h3>
                <p className="mb-10">{serviceDetails.overview}</p>

                <div className="imgs-items border-1 border-bottom border-top brd-gray">
                  <div className="img-item my-5">
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="icon mb-3 mb-lg-0">
                          <img src="/assets/img/icons/serv_icons/34.png" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <h5 className="fw-bold mb-2"> Our Work Process </h5>
                        <p>{serviceDetails.workProcess}</p>
                      </div>
                    </div>
                  </div>
                  <div className="img-item my-5">
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <div className="icon mb-3 mb-lg-0">
                          <img src="/assets/img/icons/serv_icons/35.png" alt="" />
                        </div>
                      </div>
                      <div className="col-lg-10">
                        <h5 className="fw-bold mb-2"> Troubleshooting Process </h5>
                        <p>{serviceDetails.troubleshooting}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-5 mb-4"> Going Beyond the Usual </h4>
                {serviceDetails.points.map((point, index) => (
                  <p key={index} className="mt-10">
                    <i className="fas fa-check-circle color-blue5 me-2"></i>
                    <strong className="color-000">{point}</strong>
                  </p>
                ))}

                <div className="testi-card mt-60">
                  <div className="icon">
                    <img src="/assets/img/testimonials/qout.png" alt="" />
                  </div>
                  <div className="text">
                    {serviceDetails.testimonials[0].feedback}
                  </div>
                  <div className="author">
                    <div className="img icon-60 rounded-circle overflow-hidden img-cover me-3 flex-shrink-0">
                      <img src="/assets/blog/user.png" alt="" />
                    </div>
                    <div className="inf">
                      <p> Customer </p>
                      <h6> {serviceDetails.testimonials[0].name} </h6>
                    </div>
                  </div>
                </div>

                <div className="last-next-serv d-flex align-items-center justify-content-between mt-60">
                  {prevService && (
                    <Link href={`/servicedetails?services=${prevService.id}`}>
                      <a className="item">
                        <p> Prev Service </p>
                        <h5 className="fw-bold"> {prevService.title} </h5>
                      </a>
                    </Link>
                  )}
                  {nextService && (
                    <Link href={`/servicedetails?services=${nextService.id}`}>
                      <a className="item text-end">
                        <p> Next Service </p>
                        <h5 className="fw-bold"> {nextService.title} </h5>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="side-links mt-5 mt-lg-0">
                <div className="links-card mb-40">
                  <h5> Service Category </h5>
                  {Object.entries(serviceCategories).map(([category, services]) => (
                    <div key={category}>
                      <h6>{category}</h6>
                      <ul>
                        {services.map((service) => (
                          <li key={service.id}>
                            <Link href={`/servicedetails?services=${service.id}`}>
                              <a><i className="far fa-angle-right icon"></i> {service.title}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="banner1">
                  <div className="title">
                    <h6> Call To Action </h6>
                    <h3> Make A Custom Request </h3>
                  </div>
                  <Link href= "/get-quote">
                  <a className="butn bg-white rounded-pill hover-blue5">
                    <span> Get A Quote <i className="far fa-long-arrow-right ms-2"></i> </span>
                  </a>
                  </Link>
                  <img src="/assets/img/mob1.png" alt="" className="mob" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
