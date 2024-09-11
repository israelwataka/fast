import { useRouter } from 'next/router';
import PageSingle from '../blog-single'; 
import contentData from '../../data/blog/cont.json'; 

const BlogPost = ({ content }) => {
  const router = useRouter();

  if (!content) {
    return null; // Render nothing while redirection is handled
  }

  // Pass the content as a prop to the component
  return <PageSingle content={content} />;
};

export async function getServerSideProps(context) {
  const { uid } = context.query;
  const content = contentData.blogs.find(blog => blog.uid === uid);

  if (!content) {
    // Redirect to 404 page
    return {
      notFound: true,
    };
  }

  return {
    props: { content }, // Pass the content as a prop to the component
  };
}

export default BlogPost;
