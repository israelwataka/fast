import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import TopNav from '@components/Navbars/TopNav';
import Navbar from '@components/Navbars/AppNav';
import Projects from '@components/Portfolio/videos';
import Footer from '@components/Saas/Footer';

const PagePortfolioApp = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <title>Highway Autosolutions - Portfolio</title>
      </Head>

      <MainLayout>
        <TopNav style="4" />
        <Navbar navbarRef={navbarRef} />
        <main className="portfolio-page style-1">
          <Projects />
        </main>
        <Footer noWave />
      </MainLayout>
    </>
  )
}

export default PagePortfolioApp;
