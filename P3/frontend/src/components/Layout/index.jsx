// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.css';
// import footer
import Footer from '../Footer';
import SeekerHeader from '../Header';
import DefaultHeader from '../DefaultHeader/default_header';

function Layout() {
  return (
    <div className="bg-color-baby-blue-3" 
    style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <SeekerHeader /> */}
      <DefaultHeader />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Your footer component */}
      <Footer />
    </div>
  );
}

export default Layout;
