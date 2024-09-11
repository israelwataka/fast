import appData from '@data/appData.json';

const Header = () => {
  return (
    <header 
      className="valign" 
      style={{ 
        backgroundImage: 'url(/landing-preview/img/header/1.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat' 
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="cont text-center">
              <h1> Your Journey to <br /> Reliable Auto Solutions <br /> Starts Here!  </h1>
              <a href={appData.itemStoreLink} className="btn rounded-pill bg-blue4 fw-bold text-white mt-50">
                <small className="text-uppercase"> Book Service </small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
