import React from 'react';
import { useRouter } from 'next/router';
import content from '@data/Blog/cont.json';

const Content = () => {
  const router = useRouter();
  const { uid } = router.query;
  
  const blogPost = content.blogs.find(blog => blog.uid === uid);

  if (!blogPost) {
    return <p>Blog post not found</p>;
  }

  return (
    <>
      <h4 className="fw-bold color-000 lh-4 mb-30">
        {blogPost.heading}
      </h4>
      {blogPost.paragraphs.map((paragraph, index) => (
        <div className="text mb-10 color-666" key={index}>
          {paragraph}
        </div>
      ))}
      <div className="info-imgs">
        <div className="row">
          {blogPost.images.map((image, index) => (
            <div className="col-lg-6" key={index}>
              <div className="img text-center mt-30">
                <img src={image} alt="" />
                <span className="color-999 fs-12px mt-20">Images by <a href="#" className="color-000">Admin</a></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text mt-50 color-666">
        {blogPost.quote.content}
      </div>
      <div className="twitter-info mt-60">
        <div className="twitter-card">
          <div className="twitter-header d-flex align-items-center justify-content-between">
            <div className="twitter-user d-flex align-items-center">
              <div className="icon-50 rounded-circle img-cover overflow-hidden me-3 flex-shrink-0">
                <img src={blogPost.quote.author.image} alt="" />
              </div>
              <div className="inf">
                <h6 className="fw-bold">{blogPost.quote.author.name}</h6>
                <small className="color-999"> {blogPost.quote.author.handle} - {blogPost.quote.author.date} </small>
              </div>
            </div>
            <div className="twitter-icon">
              <i className="fab fa-twitter"></i>
            </div>
          </div>
          <div className="twitter-info mt-40">
            <h5>
              “{blogPost.tweet.content}”
            </h5>
          </div>
        </div>
        <h4>{blogPost.subheading}</h4>
        <div className="text color-666 mt-30">
          {blogPost.additionalParagraph}
        </div>
        <ul className="ps-1 ps-lg-5 my-4 color-666 fs-14px lh-7">
          {blogPost.list.map((item, index) => (
            <li className="d-flex" key={index}>
              <i className="bi bi-dot me-2 fs-3 lh-2 pt-1"></i>
              {item}
            </li>
          ))}
        </ul>
        <div className="text color-666 mt-30" dangerouslySetInnerHTML={{ __html: blogPost.fondestMemory }}>
        </div>
        <div className="blog-share mt-80">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="side-tags">
                <div className="content">
                  {blogPost.tags.map((tag, index) => (
                    <a href="#" className="me-1" key={index}>{tag}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="share-icons d-flex justify-content-lg-end mt-3 mt-lg-0">
                <h6 className="fw-bold me-3 flex-shrink-0 text-uppercase">Share on</h6>
                {blogPost.sharePlatforms.map((platform, index) => (
                  <a href="#" key={index}>
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
