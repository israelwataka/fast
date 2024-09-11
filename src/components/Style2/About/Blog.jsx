import blogs from '@data/Style2/blogs.json';
import Link from 'next/link';

const Blog = () => {
  return (
    <section className="blog style-8">
      <div className="container">
        <div className="content section-padding">
          <div className="section-head text-center mb-70 style-5">
            <h2 className="mb-20"> News & <span> Insights </span> </h2>
            <p>More than 5,000 Individuals and companies trust and choose Highway Autosolutions</p>
          </div>
          <div className="blog-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="main-post wow fadeInUp">
                  <div className="img img-cover">
                    <img src="/assets/blog/electric1.jpg" alt="" />
                    <div className="tags">
                      <a> Cars and Automation </a>
                    </div>
                  </div>
                  <div className="info pt-30">
                    <div className="date-author">
                      <a  className="date">
                        Nov 21, 2023
                      </a>
                      <span className="color-999 mx-3"> | </span>
                      <a  className="author color-999">
                        By <span className="color-000 fw-bold"> Admin </span>
                      </a>
                    </div>
                    <h4 className="title">
                    <Link href="/blog">
                      <a > Unlock the secrets to a smoother, more efficient drive! Discover expert tips, the latest automotive news, and DIY guides in our blog. Your journey to better car care starts here! </a>
                      </Link>
                    </h4>         
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="side-posts">
                  {
                    blogs.map((blog, index) => (
                      <div key={index} className="item wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
                        <div className="img img-cover">
                          <img src={blog.image} alt="" />
                        </div>
                        <div className="info">
                          <div className="date-author">
                            <a className="date">
                              { blog.date }
                            </a>
                            <span className="color-999 mx-3"> | </span>
                            <a  className="author color-999">
                              By <span className="color-000 fw-bold"> { blog.admin } </span>
                            </a>
                          </div>
                          <h4 className="title">
                          <Link href={`/blog/${blog.uid}`}>
                              <a>{ blog.title }</a>
                            </Link>
                          </h4>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blog
