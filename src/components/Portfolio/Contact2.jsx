import Link from 'next/link';

const Contact = () => {
  return (
    <section className="contact style-2 bg-darkBlue pt-50">
      <div className="container">
        <div className="content text-center text-white">
          <p className="op-7 mb-70 text-uppercase">Let us help you!</p>
          <h2 className="ltspc-20 text-uppercase fs-1 lh-1 mb-50">(+254) 723 880 785</h2>
          <h4 className="fw-normal mb-20 op-9">contact@highwayautosolutions.com</h4>
          <h4 className="fw-normal mb-30 op-7">Bungoma- Mumias Road, Wings-Bungoma - 50200, KE </h4>
          <div className="text-center">
            <Link href="/contact">
              <a className="sm-butn btn border text-white radius-9 hover-lightBlue border-lightBlue m-2">
                <span>Talk to us</span>
              </a>
            </Link>
            <Link href="/services">
              <a className="sm-butn btn border text-white radius-9 hover-lightBlue border-lightBlue m-2">
                <span>Check Out Our Services</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <img src="/assets/img/global2.png" alt="" className="global_2" />
    </section>
  )
}

export default Contact