import React from 'react';
import Header from './header';
import Footer from './footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
