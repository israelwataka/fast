import { useEffect } from 'react';
import Head from 'next/head';
//= Layout
import PreviewLayout from '@layouts/Preview';
//= Components
import Header from '@components/Saas/Header';
import Features from '@components/Preview/Features';
import BuyNow from '@components/Preview/BuyNow';
import Portfolio from '@components/Preview/Portfolio';
import Codei from '@components/Preview/Codei';
import BestFeatures from '@components/Preview/BestFeatures';
import Responsive from '@components/Preview/Responsive';
import AllFeatures from '@components/Preview/AllFeatures';
import Testimonials from '@components/Saas/Testimonials';
import Blog from '@components/Style2/About/Blog'
import ChooseUs from '@components/Saas/ChooseUs';
import Footer from '@components/Saas/Footer';
import CallToAction from '@components/Preview/CallToAction';
import FAQ from '@components/App/FAQ';


const LandingPreview = () => {
  useEffect(() => {
    document.body.classList.add('index-main');
    return () => document.body.classList.remove('index-main');
  }, []);

  return (
    <>
      <Head>
        <title>Highway Auto Spares - Home</title>
      </Head>

      <PreviewLayout>
        <Header />
        <Features />
        <BuyNow />
        <ChooseUs />
        <Portfolio />
        <Codei />
        <BestFeatures />
        <Responsive />
        <AllFeatures />
        <FAQ />
        <Testimonials />
        <CallToAction />
        <Blog />
      </PreviewLayout>
      <>
      <Footer/>
      </>
    </>
  )
}

export default LandingPreview;
