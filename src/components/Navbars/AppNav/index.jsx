import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = ({ navbarRef }) => {
  const router = useRouter();
  const { pathname } = router;

  const handleMouseMove = (event) => {
    const dropDownToggler = event.target.classList.contains('dropdown-toggle') ? event.target : event.target.querySelector('.dropdown-toggle');
    const dropDownMenu = dropDownToggler?.nextElementSibling;

    dropDownToggler?.classList?.add('show');
    dropDownMenu?.classList?.add('show');
  };

  const handleMouseLeave = (event) => {
    const dropdown = event.target.classList.contains('dropdown') ? event.target : event.target.closest('.dropdown');
    const dropDownToggler = dropdown.querySelector('.dropdown-toggle');
    const dropDownMenu = dropdown.querySelector('.dropdown-menu');

    dropDownToggler?.classList?.remove('show');
    dropDownMenu?.classList?.remove('show');
  };

  const isActive = (path) => {
    if (pathname === path) {
      return true;
    }
    if (path === '/services' && pathname.startsWith('/services')) {
      return true;
    }
    if (path === '/blog' && pathname.startsWith('/blog')) {
      return true;
    }
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light style-4" ref={navbarRef}>
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/assets/img/auto.png" alt="" />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-uppercase">
            <li className="nav-item dropdown" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <Link href="/">
                <a className={`nav-link ${isActive('/') ? 'active' : ''}`} id="navbarHome" role="button">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
                  About
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a className={`nav-link ${isActive('/services') ? 'active' : ''}`}>
                  Services
                  <small className="hot alert-danger text-danger">hot</small>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/portfolio">
                <a className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`}>
                  Portfolio
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/blog">
                <a className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>
                  Blog
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact">
                <a className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>
                  <img src="/assets/img/icons/nav_icon/price.png" alt="" className="icon-15 me-2" />
                  Contact
                </a>
              </Link>
            </li>
          </ul>
          <div className="nav-side">
            <div className="d-flex align-items-center">
              <a href="#" className="search-icon me-4">
                <i className="bi bi-person"></i>
              </a>
              <Link href="/contact">
                <a className="btn rounded-pill brd-gray hover-blue4 sm-butn fw-bold">
                  <span>Join Highway Auto <i className="bi bi-arrow-right ms-1"></i> </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
