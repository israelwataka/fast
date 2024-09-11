import { useState, useEffect } from 'react';
import Link from 'next/link';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';

const Sidebar = ({ data, style, rtl }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        alert('Subscription successful!');
        setEmail(''); // Clear the input field
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const lg = document.querySelector('.lg-react-element');
    if (lg) lg.className = 'd-flex justify-content-between flex-wrap';
  }, []);

  return (
    <div className="col-lg-4">
      <div className="side-blog style-5 ps-lg-5 mt-5 mt-lg-0">
        <form action="contact.php" className="search-form mb-50" method="post">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'بحث' : 'search' }
          </h6>
          <div className="form-group position-relative">
            <input type="text" className="form-control rounded-pill" placeholder={ rtl ? "اكتب وارسل" : "Type and hit enter" } />
            <button className="search-btn border-0 bg-transparent"> <i className="fas fa-search"></i> </button>
          </div>
        </form>

        <div className="side-recent-post mb-50">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'المنشورات الاخيرة' : 'recent post' }
          </h6>
          {
            data.recentPosts.map((post, index) => (
              <Link href={`/blog/${post.uid}` } key={index}>
                <a className={`post-card ${index !== data.recentPosts.length - 1 ? 'pb-3 mb-3 border-bottom brd-gray':''}`}>
                  <div className="img me-3">
                    <img src={post.image} alt="" />
                  </div>
                  <div className="inf">
                    <h6>{ post.title }</h6>
                    <p>{ rtl ? 'إذا كانت هناك طريقة واحدة تعمل بها التكنولوجيا اللاسلكية' : 'Highway Auto Solutions, Bringing solutions near you' } [...]</p>
                  </div>
                </a>
              </Link>
            ))
          }
        </div>

        <div className="side-categories mb-50">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'التصنيفات' : 'categories' }
          </h6>
          {
            data.categories.map((category, index) => (
              <a href="#" className="cat-item" key={index}>
                <span>{ category.title }</span>
                <span>{ category.count }</span>
              </a>
            ))
          }
        </div>

        <div className="side-newsletter mb-50">
          <h6 className="title mb-10 text-uppercase fw-normal">
            { rtl ? 'نشرة الاخبار' : 'newsletter' }
          </h6>
          <div className="text">
            { rtl ? 'سجل الآن للحصول على آخر التحديثات الخاصة بالعروض الترويجية والقسائم.' : 'Register now to get latest updates on promotions & coupons.' }
          </div>
          <form onSubmit={handleSubmit} className="form-subscribe">
            <div className="email-input d-flex align-items-center py-3 px-3 bg-white mt-3 radius-5">
              <span className="icon me-2 flex-shrink-0">
                <i className="far fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="Email Address"
                className="border-0 bg-transparent fs-12px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`btn bg-blue${style} sm-butn text-white hover-darkBlue w-100 mt-3 radius-5 py-3`}
            >
              <span>{ rtl ? 'أشترك' : 'Subscribe' }</span>
            </button>
          </form>
        </div>

        <div className="side-share mb-50">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'اجتماعي' : 'social' }
          </h6>
          <a href="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-goodreads-g"></i>
          </a>
          <a href="#" className="social-icon">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        <div className="side-insta mb-50">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'انستجرام' : 'our instagram' }
          </h6>
          <LightGallery speed={500} backdropDuration={500}>
            {
              data.instagram.map((image, index) => (
                <a href={image} className="insta-img img-cover" data-fancybox="gallery" key={index}>
                  <img src={image} alt="" />
                  <i className="fab fa-instagram icon"></i>
                </a>
              ))
            }
          </LightGallery>
        </div>

        <div className="side-tags">
          <h6 className="title mb-20 text-uppercase fw-normal">
            { rtl ? 'الكلمات الاكثر بحثا' : 'popular tags' }
          </h6>
          <div className="content">
            {
              data.tags.map((tag, index) => (<a href="#" key={index} className="me-1">{ tag }</a>))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
