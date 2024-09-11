import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import AbsoluteContainer from '@components/Navbars/AbsoluteContainer';
import TopNav from '@components/Navbars/TopNav';
import Navbar from '@components/Navbars/AppNav';
import NotFound from '@components/404';;

const Page404 = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current, true);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <title>Highway Autosolutions - 404</title>
      </Head>

      <MainLayout>
        <AbsoluteContainer>
          {/* <TopNav style="4" /> */}
          {/* <Navbar navbarRef={navbarRef} /> */}
        </AbsoluteContainer>
        <main className="erorr-404-page">
          <NotFound />
        </main>
      </MainLayout>
    </>
  )
}

export default Page404;
