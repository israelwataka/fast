import { useRouter } from 'next/router';
import details from '@data/Portfolio/details.json';

const ServicePage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Client-side redirection handling
  // This will be handled in `getServerSideProps`, but you can also handle it here if needed
  return null;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const service = details.find(service => service.id === id);

  if (!service) {
    // Redirect to 404 page if service is not found
    return {
      notFound: true,
    };
  }

  // Redirect to the servicedetails page with the correct query parameter
  return {
    redirect: {
      destination: `/servicedetails/?services=${id}`, // Adjust the query parameter as needed
      permanent: false,
    },
  };
}

export default ServicePage;
