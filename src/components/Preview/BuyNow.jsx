import Link from 'next/link';
import React, { useState } from 'react';

const BuyNow = () => {
  const [vehicleModel, setVehicleModel] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(`Vehicle Model: ${vehicleModel}, Selected Service: ${selectedService}`);
  };

  return (
    <section className="box-gr">
      <div className="container-xxl box">
        <div className="row">
          <div className="col-lg-5 valign">
            <div className="cont mb-5 mb-lg-0">
              <h2 className="mb-20 text-capitalize">Ready to get started? Request a quote today!</h2>
              <p className="color-777 lh-6 fs-14px">Whether you need a simple repair or a comprehensive diagnostic, we provide transparent and competitive pricing to fit your budget!</p>
              <Link href="/get-quote">
              <a  className="btn rounded-pill bg-blue4 fw-bold text-white mt-50">
                <small className="text-uppercase">Get Quote Now</small>
              </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="img">
              <img src="/landing-preview/img/b1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuyNow
