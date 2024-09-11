import { useRouter } from 'next/router'; // Next.js hook for routing
import Details from './Details';
import Metadata from './Metadata';
import Content from './Content';
import Comments from './Comments';
import Sidebar from './Sidebar';

import news from '@data/SinglePost/allnews.json'; // Only use the regular news data

const AllNews = ({ isWide, leftSidebar, style = "4" }) => {
  const router = useRouter(); // Next.js hook to access the route
  const { uid } = router.query; // Get the uid from the URL

  // Use only the regular news data
  const data = news;

  // Find the blog post that matches the uid
  const post = data.blogs.find(blog => blog.uid === uid);

  // Handle case where the post is not found
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <section className="all-news section-padding pt-50 blog bg-transparent style-3">
      <div className="container">
        {/* Pass post-specific details */}
        <Details details={{ title: post.title, time: post.time, image: post.image, type: post.type }} style={style} />
        <div className="row gx-4 gx-lg-5">
          {/* Conditionally render left sidebar */}
          {!isWide && leftSidebar && (
            <Sidebar data={data.sidebar} style={style} />
          )}
          <div className={isWide ? 'col-lg-12' : 'col-lg-8'}>
            {/* Pass post-specific metadata */}
            <Metadata metadata={{ commentsCount: post.commentsCount, viewsCount: post.viewsCount }} />
            <div className="blog-content-info">
              <Content style={style} />
              {/* Pass post-specific comments and comment card */}
              <Comments comments={post.comments} commentCard={post.commentCard} style={style} />
            </div>
          </div>
          {/* Conditionally render right sidebar */}
          {!isWide && !leftSidebar && (
            <Sidebar data={data.sidebar} style={style} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllNews;
