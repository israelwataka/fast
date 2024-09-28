import Link from 'next/link';
import teamMembers from '@data/Preview/team.json'

const Team = () => {
  return (
    <section className="team section-padding pt-0 style-1">
      <div className="container">
        <div className="section-head mb-60 text-center">
          <h6 className="color-main text-uppercase wow fadeInUp">meet our team</h6>
          <h2 className="wow fadeInUp">
            Clients Satisfaction, <span className="fw-normal">Our Reputation</span>
          </h2>
        </div>
        <div className="content">
          {
            teamMembers.map((member, index) => (
              <div className="team_box wow fadeInUp" data-wow-delay={index * 0.2 + "s"} key={index}>
                <div className="avatar">
                  <img src={member.picture} alt="" />
                </div>
                <div className="info">
                  <h6><a href="#">{ member.name }</a></h6>
                  <small>{ member.position }</small>
                  <div className="social_icons">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="bttns mt-4 text-center">
          <Link href="/contact">
            <a className="btn butn-gard border-0 text-white wow zoomIn">
              <span>Join Our Team</span>
            </a>
          </Link>
        </div>
      </div>
      <img src="/assets/add/user.png" alt="" className="team_shap" />
    </section>
  )
}

export default Team