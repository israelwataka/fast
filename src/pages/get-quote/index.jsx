import { useEffect } from 'react';
import Head from 'next/head';
//= Layout
import PreviewLayout from '@layouts/Preview';
//= Components

import BestFeatures from '@components/Preview/BestFeatures';
import GetQuote from '@components/App/getquote';
import FAQ from '@components/App/FAQ';
import Footer from '@components/Saas/Footer';

const LandingPreview = () => {
  useEffect(() => {
    document.body.classList.add('index-main');
    return () => document.body.classList.remove('index-main');
  }, []);

  return (
    <>
      <Head>
        <title>Highway Auto Spares - get a quote</title>
      </Head>

      <PreviewLayout>
        <GetQuote />
        <BestFeatures />
        <FAQ />
      </PreviewLayout>
      <Footer/>
    </>
  )
}

export default LandingPreview;
