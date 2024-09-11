import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import TopNav from '@components/Navbars/TopNav';
import Navbar from '@components/Navbars/AppNav';
import Community from '@components/Contact/Community';
import Form from '@components/Contact/Form';
import Map from '@components/Contact/Map';
import Footer from '@components/Saas/Footer';
import FAQ from '@components/App/FAQ';

const PageContactApp = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <title>Highway Autosolutions - Contact</title>
      </Head>

      <MainLayout>
        <TopNav style="4" />
        <Navbar navbarRef={navbarRef} />
        <main className="contact-page style-5">
          <Community />
          <Form />
          <Map />
          <FAQ />
        </main>
        <Footer noWave />
      </MainLayout>
    </>
  )
}

export default PageContactApp;
