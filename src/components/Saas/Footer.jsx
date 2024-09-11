import Link from 'next/link';
import footerData from '@data/Saas/footer.json';

const Footer = () => {
  return (
    <footer className="style-5 border-top brd-gray">
      <div className="container">
        <div className="row gx-0 justify-content-between">
          <div className="col-lg-3 col-sm-6">
            <div className="items">
              <div className="title">
                Highway Autosolutions
              </div>
              <small className="text">
              Your trusted partner for top-quality automotive care. Expert service, advanced technology, and customer 
              satisfaction guaranteed. Visit us or book online today! <br />Keeping You on the Road.
              </small>
              <div className="socail-icons">
                <a href="https://twitter.com/" rel="noreferrer" className="icon-35 rounded-circle bg-gray overflow-hidden d-inline-flex align-items-center justify-content-center text-gray me-2" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://facebook.com/" rel="noreferrer" className="icon-35 rounded-circle bg-gray overflow-hidden d-inline-flex align-items-center justify-content-center text-gray me-2" target="_blank">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://instagram.com/" rel="noreferrer" className="icon-35 rounded-circle bg-gray overflow-hidden d-inline-flex align-items-center justify-content-center text-gray" target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="items">
              <div className="title">
                Information
              </div>
              <small className="text mb-10 d-block">
                { footerData.address.address1 } <br /> { footerData.address.address2 }
              </small>
              <small className="text mb-10 d-block">
                { footerData.phone }
              </small>
              <small className="text d-block">
                { footerData.email }
              </small>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="items">
              <div className="title">
                Useful Links
              </div>
              <ul>
                {
                  footerData.usefulLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.link}><a>{link.title}</a></Link>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="items">
              <div className="title">
                Resource
              </div>
              <ul>
                {
                  footerData.resources.map((link, index) => (
                    <li key={index}>
                      <a href={link.link}>{link.title}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="foot">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="logo">
                <img src="/assets/img/auto.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <small className="small">
              Copyright © 2024 <a href="#" className="fw-bold text-decoration-underline">Highway Autosolutions.</a> All Rights Reserved. Designed by <a href="https://wa.me/254711245450" className="fw-bold text-decoration-underline">TechMtaani</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
