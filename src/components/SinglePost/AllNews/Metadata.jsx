import Link from 'next/link';

const Metadata = ({ metadata }) => {
  return (
    <div className="d-flex small align-items-center justify-content-between mb-70 fs-12px">
      <div className="l_side d-flex align-items-center">
        <a href="#" className="me-3 me-lg-5">
          <span className="icon-20 rounded-circle d-inline-flex justify-content-center align-items-center text-uppercase bg-main p-1 me-2 text-white">
            A
          </span>
          <span>
            By Admin
          </span>
        </a>
        <a href="#" className="me-3 me-lg-5">
          <i className="bi bi-chat-left-text me-1"></i>
          <span>{metadata.commentsCount} Comments</span>
        </a>
        <a href="#">
          <i className="bi bi-eye me-1"></i>
          <span>{metadata.viewsCount} Views</span>
        </a>
      </div>
      <div className="r-side mt-1">
        <Link href="/contact">
          <a>
            <i className="bi bi-info-circle me-1"></i>
            <span>Report</span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Metadata;
