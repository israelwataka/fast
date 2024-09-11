import { useState } from 'react';

const Comments = ({ commentCard, comments, style, rtl }) => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, name, email }),
      });

      if (res.ok) {
        alert('Comment submitted successfully!');
        // Clear the form fields
        setComment('');
        setName('');
        setEmail('');
      } else {
        alert('Failed to submit comment. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="blog-comments mt-70">
      {/* Comment Card */}
      <div className="comment-card card p-5 radius-5 border-0 mt-50">
        <div className="d-flex">
          <div className="icon-60 rounded-circle img-cover overflow-hidden me-3 flex-shrink-0">
            <img src={commentCard.user.picture} alt="" />
          </div>
          <div className="inf">
            <h6 className="fw-bold">{ commentCard.user.name }</h6>
            <small className="color-999">{ commentCard.date }</small>
            <div className="text color-000 fs-12px mt-10">
              { commentCard.text }
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="comments-content mt-70">
        <h3 className="color-000 mb-0">
          { comments.length < 10 ? `0${comments.length}` : comments.length } { rtl ? 'تعليقات' : 'Comments' }
        </h3>
        {
          comments.map((comment, index) => (
            <div key={index} className={`comment-replay-cont ${index !== comments.length - 1 ? 'border-bottom border-1 brd-gray':''} pb-40 pt-40`}>
              <div className="d-flex comment-cont">
                <div className="icon-60 rounded-circle img-cover overflow-hidden me-3 flex-shrink-0">
                  <img src={comment.user.picture} alt="" />
                </div>
                <div className="inf">
                  <div className="title d-flex justify-content-between">
                    <h6 className="fw-bold fs-14px">{ comment.user.name }</h6>
                    <span className="time fs-12px text-uppercase">{ comment.time }</span>
                  </div>
                  <div className="text color-000 fs-12px mt-10">{ comment.content }</div>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form d-block pt-30">
        <h3 className="color-000 mb-40">{ rtl ? 'اضافة تعليق' : 'Leave A Comment' }</h3>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group mb-30">
              <textarea
                className="form-control radius-4 fs-12px p-3"
                rows="6"
                placeholder={ rtl ? "اكتب تعليقك هنا" : "Write your comment here" }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group mb-4 mb-lg-0">
              <input
                type="text"
                className="form-control fs-12px radius-4 p-3"
                placeholder={ rtl ? "اسمك *" : "Your Name *" }
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <input
                type="email"
                className="form-control fs-12px radius-4 p-3"
                placeholder={ rtl ? "بريدك الالكترونى *" : "Your Email *" }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className={`btn rounded-pill blue${style}-3Dbutn hover-blue4 sm-butn fw-bold mt-40`}>
              <span>{ rtl ? 'ارسال التعليق' : 'Submit Comment' }</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comments;
