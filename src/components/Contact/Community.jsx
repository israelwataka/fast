import communityData from '@data/Contact/community.json';

const Community = () => {
  return (
    <section
      className="community section-padding style-5"
      style={{
        backgroundImage: 'url(/assets/img/foot_7_pattern.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="section-head text-center style-4 mb-40">
          <small className="title_small">Contact us</small>
          <h2 className="mb-20">Get In Touch</h2>
          <p>We will contact again after receive your request in 24h</p>
        </div>
        <div className="content rounded-pill">
          {
            communityData.map((card, i) => (
              <div className="commun-card" key={i}>
                <div className="icon icon-45">
                  <img src={card.icon} alt="" />
                </div>
                <div className="inf">
                  <h5>{card.info}</h5>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Community;
