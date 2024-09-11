import appData from '@data/appData.json';
import Link from 'next/link';

const Responsive = () => {
  return (
    <section className="respons section-padding">
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-6">
            <div className="img md-mb50">
              <img src="/landing-preview/img/b2.png" alt="" />
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 valign">
            <div className="cont">
              <h6 className="sub-title d-inline-block text-uppercase ltspc-4 color-grd mb-20">Unlock Confidence</h6>
              <h2 className="fs-1 text-capitalize">Unlock Seamless Driving – Expert Car Ignition and Lock Repair  <br /> for Total Security!</h2>
              <p className="fs-6 mt-10 color-777">Never let a faulty ignition or jammed lock disrupt your day. Our skilled technicians specialize in repairing and replacing car ignitions and locks, ensuring your vehicle's security and reliability. Whether it's a stubborn ignition switch or a broken lock, we provide swift, efficient, and reliable solutions to get you back on the road with confidence. Trust us to safeguard your car and restore your peace of mind with our top-tier ignition and lock repair services.</p>
             
             <Link href="services">
              <a  className="btn rounded-pill bg-blue4 fw-bold text-white mt-50">
                <small className="text-uppercase">See How</small>
              </a>
              </ Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Responsive
