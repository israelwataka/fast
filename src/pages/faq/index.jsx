import { useEffect } from 'react';
import Head from 'next/head';
//= Layout
import PreviewLayout from '@layouts/Preview';
//= Components
import AllFeatures from '@components/Preview/AllFeatures';
import Testimonials from '@components/Saas/Testimonials';
import Footer from '@components/Saas/Footer';
import FAQ from '@components/App/FAQ';


const LandingPreview = () => {
  useEffect(() => {
    document.body.classList.add('index-main');
    return () => document.body.classList.remove('index-main');
  }, []);

  return (
    <>
      <Head>
        <title>Highway Auto Spares - FAQ</title>
      </Head>

      <PreviewLayout>
        {/* <Header/> */}
        <FAQ />
        <AllFeatures />
        <Testimonials />
      </PreviewLayout>
      <>
      <Footer/>
      </>
    </>
  )
}

export default LandingPreview;
