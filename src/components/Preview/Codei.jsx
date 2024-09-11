import appData from '@data/appData.json';
import Link from 'next/link';

const Codei = () => {
  return (
    <section className="codei section-padding">
      <div className="container-xxl box px-4">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="cont mb-5 mb-lg-0">
              <h2 className="mb-20 lh-3 fs-2 text-capitalize">Beat the Heat with Our Expert AC Repair and Refill – Breathe New Life into Your Car’s Comfort!</h2>
              <p className="color-777 lh-6 fs-14px">Don't let a faulty AC ruin your ride. Our specialized technicians ensure your car's air conditioning system is running smoothly and efficiently, providing you with cool, refreshing air even on the hottest days. </p>
              <p className="color-777 lh-6 fs-14px">With quick turnaround times and meticulous attention to detail, we guarantee your complete satisfaction. Experience unparalleled comfort and reliability with our top-notch AC repair and refill services.</p>
              <Link href="/services" >
              <a className="btn rounded-pill bg-blue4 fw-bold text-white mt-50">
                <small className="text-uppercase">Order Service</small>
              </a>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="img">
              <img src="/landing-preview/img/b3.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Codei
