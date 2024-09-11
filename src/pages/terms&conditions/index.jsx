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
import Terms from '@components/Style2/terms';
import About from '@components/Style2/About/About';
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
        <Header page="Terms" title=" Terms and conditions" />
        <main className="about-page style-2">
        
         <About />
         <Terms />
        </main>
        <Footer noWave />
      </MainLayout>
    </>
  )
}

export default PageAbout5;
