import Link from 'next/link';
import aboutData from '@data/App/about.json';

const About = () => {
  return (
    <section className="about section-padding style-4">
      <div className="integration">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-head text-center style-4">
              <small className="title_small">About Highway Autosolutions</small>
              <h2 className="mb-20">We are <br /> committed to excellence <span> Your satisfaction is the priority </span> </h2>
              <p>Keeping You on the Road – Reliable, Efficient, and Expert Auto Solutions</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content mb-100 pb-100 border-1 border-bottom brd-gray">
            {
              aboutData.integrations.map((item, index) => (
                <div className="img" key={index}>
                  <img src={item} alt="" className="mt-30" />
                </div>
              ))
            }
          </div>
        </div>
        <img src="/assets/img/about/intg_back.png" alt="" className="intg-back" />
      </div>
      <div className="content frs-content">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="img mb-30 mb-lg-0">
                <img src="/assets/img/about/ipad.png" alt="" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="info">
                <div className="section-head style-4">
                  <small className="title_small">HIGHWAY AUTOSOLUTIONS</small>
                  <h2 className="mb-30">Expert Service, Anytime <span>Ensuring Your Vehicle Runs Smoothly and Safely.</span> </h2>
                </div>
                <p className="text mb-40">
                we are committed to excellence. We continuously update our skills and technology to provide you with the best service possible. Whether you need a simple repair or a complex diagnosis, you can trust us to get the job done right.
                 </p>
                <ul>
                  {
                    aboutData.features.map((feature, index) => (
                      <li className={`d-flex align-items-center ${index !== aboutData.features.length - 1 ? 'mb-3':''}`} key={index}>
                        <small className="icon-30 bg-gray rounded-circle color-blue4 d-inline-flex align-items-center justify-content-center me-3">
                          <i className={feature.icon}></i>
                        </small>
                        <h6 className="fw-bold">{ feature.title }</h6>
                      </li>
                    ))
                  }
                </ul>
                <Link href="/page-contact-app">
                  <a className="btn rounded-pill bg-blue4 fw-bold text-white mt-50">
                    <small>Find Out More</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/img/about/about_s4_lines.png" alt="" className="lines" />
        <img src="/assets/img/about/about_s4_bubble.png" alt="" className="bubble" />
      </div>
    </section>
  )
}

export default About
