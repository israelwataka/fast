import React from 'react'
import Link from 'next/link';

const Header = ({ page, title }) => {
  return (
    <section className="inner-header style-5">
      <div className="container">
        <div className="content">
          <div className="links">
            <Link href="/">
            <a > Home </a>
            </Link>
            <a href="#" className="ms-1"> { page } </a>
          </div>
          <h2> { title } </h2>
          <img src="/assets/blog/carauto.png" alt="" className="side-img slide_up_down" />
        </div>
      </div>
    </section>
  )
}

export default Header
