import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import TopNav from '@components/Navbars/TopNav';
import Navbar from '@components/Navbars/AppNav';
import Header from '@components/Style2/Header';
import About from '@components/Style2/About/About';
import Timeline from '@components/Style2/About/Timeline';
import Blog from '@components/Style2/About/Blog'
import Philosophy from '@components/Saas/Philosophy';
import ChooseUs from '@components/Saas/ChooseUs';
import Clients from '@components/Saas/Clients';
import Numbers from '@components/Saas/Numbers';
import Contact from '@components/Saas/Contact';
import Footer from '@components/Saas/Footer';

const PageAbout5 = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <title>Highway Autosolutions - About Us</title>
      </Head>

      <MainLayout>
        <TopNav style="4" />
        <Navbar navbarRef={navbarRef} />
        <Header page="About Us" title="About Highway Autosolutions" />
        <main className="about-page style-2">
         <About />
         <Timeline />
          <Philosophy />
          <ChooseUs />
          <Numbers />
          <Contact />
          <Clients padding />
          <Blog />
        </main>
        <Footer noWave />
      </MainLayout>
    </>
  )
}

export default PageAbout5;
