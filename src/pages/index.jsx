import { useEffect } from 'react';
import Head from 'next/head';
//= Layout
import PreviewLayout from '@layouts/Preview';
//= Components
import Header from '@components/Saas/Header';
import Features from '@components/Preview/Features';
import Services from '@components/Preview/Services';
import Contact from '@components/Preview/Contact';
import BuyNow from '@components/Preview/BuyNow';
import Video from '@components/Preview/Video';
import Team from '@components/Preview/Team';
import Choose from '@components/Portfolio/Choose';
import Contact2 from '@components/Portfolio/Contact2'
import Portfolio from '@components/Preview/Portfolio';
import Codei from '@components/Preview/Codei';
import BestFeatures from '@components/Preview/BestFeatures';
import Responsive from '@components/Preview/Responsive';
import AllFeatures from '@components/Preview/AllFeatures';
import Testimonials from '@components/Saas/Testimonials';
import ChooseUs from '@components/Saas/ChooseUs';
import Map from '@components/Contact/Map';
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
        {/* <Features /> */}
        <Services />
        <Video />
        <Team />
        <BuyNow />
        <Choose />
        <Portfolio />
        <Codei />
        <BestFeatures />
        <Responsive />
        <AllFeatures />
        <FAQ />
        <Contact />
        <Testimonials />
        <CallToAction />
      </PreviewLayout>
      <main className="contact-page style-5">
          <Map />
        </main>
      <>
      <Contact2/>
      <Footer/>
      </>
    </>
  )
}

export default LandingPreview;
