import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import TopNav from '@components/Navbars/TopNav';
import Navbar from '@components/Navbars/AppNav';
import Header from '@components/Style2/Header';
import Details from '@components/Style2/ServicesDetails/Details';
import Contact from '@components/Style2/ServicesDetails/Contact';
import Footer from '@components/Saas/Footer';
import detailsData from '@data/Portfolio/details.json';

const PageServiceDetails = () => {
  const navbarRef = useRef(null);
  const router = useRouter();
  const { services } = router.query;
  const [serviceTitle, setServiceTitle] = useState('Service Details');

  useEffect(() => {
    navbarScrollEffect(navbarRef.current, true);

    if (services) {
      const service = detailsData.find(detail => detail.id === services);
      if (service) {
        setServiceTitle(service.title);
      }
    }
  }, [navbarRef, services]);

  return (
    <>
      <Head>
        <title>Highway Autosolutions - {serviceTitle}</title>
      </Head>

      <MainLayout>
        <>
        <TopNav style="5" />
        <Navbar navbarRef={navbarRef} />
        </>
        <Header page="Service Details" title={serviceTitle} />
        <main className="services-details-page style-5">
          <Details />
          <Contact />
        </main>
        <Footer noWave />
      </MainLayout>
    </>
  )
}

export default PageServiceDetails;
