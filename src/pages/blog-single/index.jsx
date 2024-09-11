import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import TopNav from '@components/Navbars/TopNav';
import Navbar from '@components/Navbars/AppNav';
import AllNews from '@components/SinglePost/AllNews';
import PopularPosts from '@components/SinglePost/PopularPosts';
import Footer from '@components/Saas/Footer';

const PageSinglePostLeftSidebarApp = ({ content = {} }) => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  // Default content if content is missing
  const { title = 'Default Title', paragraphs = [] } = content;

  return (
    <>
      <Head>
        <title>{title} - Highway Autosolutions</title>
      </Head>

      <MainLayout>
        <TopNav style="4" />
        <Navbar navbarRef={navbarRef} />
        <main className="blog-page style-5 color-4">
          <AllNews />
          <PopularPosts />
        </main>
        <Footer noWave />
      </MainLayout>
    </>
  );
};

export default PageSinglePostLeftSidebarApp;
